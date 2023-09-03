package com.bitsandbyte.home.controller;

import java.util.List;
import java.util.Optional;

import com.bitsandbyte.home.model.Attachment;
import com.bitsandbyte.home.repository.AttachmentRepository;
import com.bitsandbyte.home.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bitsandbyte.home.helper.FileUploadHelper;
import com.bitsandbyte.home.model.CourseMaterial;
import com.bitsandbyte.home.repository.CourseMaterialRepository;
import com.bitsandbyte.home.service.CourseMaterialService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.core.io.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/material")
@CrossOrigin
public class CourseMaterialController {
    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private CourseMaterialRepository courseMaterialRepository;

    @Autowired
    private FileUploadHelper fileUploadHelper;

    @Autowired
    private CourseMaterialService courseMaterialService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertCourseMaterial(
            @RequestParam(value = "content", required = false) MultipartFile content,
            @RequestPart(name = "material") String materialString)
            throws Exception {
        System.out.println(materialString);
        CourseMaterial courseMaterial = new ObjectMapper().readValue(materialString, CourseMaterial.class);

        System.out.println(courseMaterial);

        // uploading student profile picture
//		boolean flag = this.fileUploadHelper.uploadFile(content);
        Attachment attachment = this.attachmentService.saveAttachment(content);
        if (attachment != null) {
            String materialUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/download/")
                    .path(String.valueOf(attachment.getId()))
                    .toUriString();
            courseMaterial.setMaterialUrl(materialUrl);
            courseMaterial.setAttachmentId(attachment.getId());
//            courseMaterial.setAttachmentId(attachment.getFileName());
            courseMaterial.setMaterialName(attachment.getFileName());
        }
        if (this.courseMaterialService.insertCourseMaterial(courseMaterial)) {

            return ResponseEntity.ok("Material inserted successfuly!");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong! please try again after sometime.");
    }


    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadMaterial(@PathVariable int fileId) throws Exception {
        Attachment attachment = this.attachmentService.getAttachment(fileId);

        System.out.println("Inside the downlaod function");
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attchment; filename=\"" + attachment.getFileName() + "\"")
                .body(new ByteArrayResource(attachment.getData()));

    }

    @DeleteMapping("/delete/{attachmentId}")
    public ResponseEntity<?> deleteMaterial(@PathVariable int attachmentId) {
		CourseMaterial courseMaterial = this.courseMaterialRepository.findByAttachmentId(attachmentId);
        if (this.courseMaterialService.deleteMaterial(courseMaterial.getId())) {
            this.attachmentRepository.deleteById(attachmentId);
            return ResponseEntity.ok("You have successfuly deleted material!");
		 }
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong! please try again after sometime.");
    }

    @GetMapping("/materials")
    public ResponseEntity<List<CourseMaterial>> getMaterials() {
        List<CourseMaterial> materials = (List<CourseMaterial>) this.courseMaterialRepository.findAll();
        return new ResponseEntity<List<CourseMaterial>>(materials, HttpStatus.OK);
    }

    @GetMapping("/materialByCourseId/{courseId}")
    public ResponseEntity<List<CourseMaterial>> getMaterialsByCourseId(@PathVariable int courseId) {
        List<CourseMaterial> materials = (List<CourseMaterial>) this.courseMaterialRepository.findByCourseId(courseId);
        return new ResponseEntity<List<CourseMaterial>>(materials, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCourseMaterial(
            @RequestParam(value = "content", required = false) MultipartFile content,
            @RequestPart(name = "material") String materialString)
            throws JsonMappingException, JsonProcessingException {
        CourseMaterial courseMaterial = new ObjectMapper().readValue(materialString, CourseMaterial.class);

        // uploading student profile picture
        boolean flag = this.fileUploadHelper.uploadFile(content);

        if (flag) {
            String materialUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
                    .path(content.getOriginalFilename()).toUriString();
            courseMaterial.setMaterialUrl(materialUrl);
        }
        if (this.courseMaterialService.updateCourseMaterial(courseMaterial)) {
            return ResponseEntity.ok("Material updated successfuly!");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong! please try again after sometime.");
    }

}
