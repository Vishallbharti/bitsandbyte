package com.bitsandbyte.home.service;


import com.bitsandbyte.home.model.Attachment;
import com.bitsandbyte.home.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AttachmentService {
    @Autowired(required = true)
    private AttachmentRepository attachmentRepository;

    public Attachment saveAttachment(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try{
            if(fileName.contains("..")){
                throw new Exception("Filename contains invalid path sequence!" + fileName);
            }
            Attachment attachment = new Attachment(fileName,file.getContentType(),file.getBytes());
            return attachmentRepository.save(attachment);
        }catch (Exception e){
            throw new Exception("Could not save file!");
        }
    }

    public Attachment getAttachment(int fileId) throws Exception {
        return this.attachmentRepository.findById(fileId).orElseThrow(()->new Exception("File not found with id : " + fileId));
    }
}

