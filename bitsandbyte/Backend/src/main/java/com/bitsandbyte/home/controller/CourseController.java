package com.bitsandbyte.home.controller;

import java.util.List;

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
import com.bitsandbyte.home.model.Course;
import com.bitsandbyte.home.repository.CourseRepository;
import com.bitsandbyte.home.service.CourseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class CourseController {

	@Autowired
	private FileUploadHelper fileUploadHelper;
	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private CourseService courseService;

	@PostMapping("/insert")
	public ResponseEntity<?> insertCourse(@RequestParam(value = "courseImg", required = false) MultipartFile courseImg,
			@RequestPart(name = "course") String courseString) throws JsonMappingException, JsonProcessingException {
		Course course = new ObjectMapper().readValue(courseString, Course.class);

		// uploading student profile picture
		boolean flag = this.fileUploadHelper.uploadFile(courseImg);

		if (flag) {
			String imgUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(courseImg.getOriginalFilename()).toUriString();
			course.setCourseImgUrl(imgUrl);
			;
		}
		if (this.courseService.insertCourse(course)) {
			return ResponseEntity.ok("Course inserted successfuly!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Something went wrong! please try again after sometime.");
	}

	@DeleteMapping("/delete/{courseId}")
	public ResponseEntity<?> deleteCourse(@PathVariable int courseId) {
		System.out.println(courseId);
		if (this.courseService.deleteCourse(courseId)) {
			return ResponseEntity.ok("You have sucessfuly deleted course!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Something went wrong! please try after some time.");
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateCourse(@RequestParam(value = "courseImg", required = false) MultipartFile courseImg,
			@RequestPart(name = "course") String courseString) throws JsonMappingException, JsonProcessingException {
		Course course = new ObjectMapper().readValue(courseString, Course.class);

		// uploading student profile picture
		boolean flag = this.fileUploadHelper.uploadFile(courseImg);

		if (flag) {
			String imgUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(courseImg.getOriginalFilename()).toUriString();
			course.setCourseImgUrl(imgUrl);
		}
		if (this.courseService.updateCourse(course)) {
			return ResponseEntity.ok("Course updated successfuly!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Something went wrong! please try again after sometime.");
	}

	@GetMapping("/getCourses")
	public ResponseEntity<List<Course>> getCourses() {
		List<Course> courses = (List<Course>) this.courseRepository.findAll();
		return new ResponseEntity<List<Course>>(courses, HttpStatus.OK);
	}
	
	//Get Course Details By Id
		@GetMapping("/getCourse/{id}")
		public ResponseEntity<?> getCourseById(@PathVariable long id){
			Course emp = courseRepository.findById((int) id).orElseThrow();
			return ResponseEntity.ok(emp);
				
		}
}
