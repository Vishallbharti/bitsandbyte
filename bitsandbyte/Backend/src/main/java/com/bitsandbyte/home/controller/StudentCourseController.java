package com.bitsandbyte.home.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.model.Address;
import com.bitsandbyte.home.model.Course;
import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.model.StudentCourse;
import com.bitsandbyte.home.repository.AddressRepository;
import com.bitsandbyte.home.repository.CourseRepository;
import com.bitsandbyte.home.repository.StudentCourseRepository;
import com.bitsandbyte.home.repository.StudentRepository;
import com.bitsandbyte.home.service.StudentCourseService;

@RestController
@CrossOrigin
@RequestMapping("/studentCourse")
public class StudentCourseController {

	@Autowired
	private StudentCourseRepository studentCourseRespository;

	@Autowired
	private StudentCourseService studentCourseService;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private AddressRepository addressRespository;

	@Autowired
	private StudentRepository studentRepository;

	@GetMapping("/addCourse/{studentId}/{courseIdArr}")
	public ResponseEntity<?> addCourse(@PathVariable int studentId, @PathVariable List<Integer> courseIdArr) {
		System.out.println(studentId);
		System.out.println(courseIdArr);
		boolean flag = false;

		for (int courseId : courseIdArr) {
			StudentCourse studentCourse = new StudentCourse();
			studentCourse.setCourseId(courseId);
			studentCourse.setStudentId(studentId);
			flag = this.studentCourseService.studentCourseIds(studentCourse);
		}

		if (flag) {
			return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, "You have added course"));
		} else {
			return ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, "Something went wrong"));

		}

	}

//	get Courses by student id
	@GetMapping("/getCourses/{idd}")
	public ResponseEntity<?> getCoursesById(@PathVariable int idd) {

		List<Integer> courseIds = this.studentCourseRespository.getCourseId(idd);
		List<Optional<Course>> courses = new ArrayList<>();

		if (!courseIds.isEmpty()) {
			for (Integer id : courseIds) {
				courses.add(this.courseRepository.findById(id));
			}
		}
		return ResponseEntity.ok(courses);
	}
	
	

//	Get Student Course details by student Serial Number
	@GetMapping("/studentCourseBySerial/{studentSr}")
	public ResponseEntity<?> getAddressByStudentSrNo(@PathVariable String studentSr) {
		System.out.println(studentSr);
		int id = this.studentRepository.findByStudentSr(studentSr).getId();
		System.out.println(id);
		List<Integer> courseIds = this.studentCourseRespository.getCourseId(id);
		List<Optional<Course>> courses = new ArrayList<>();

		if (!courseIds.isEmpty()) {
			for (Integer idd : courseIds) {
				courses.add(this.courseRepository.findById(idd));
			}
		}
		return ResponseEntity.ok(courses);

	
	}
	
	
	
//	Get Student CourseDetails By StudentSerial
	
//	@GetMapping("/studentCourse/{studentSr}")
//	public ResponseEntity<?> getCourseByStudentSrNo(@PathVariable String studentSr) {
//		int id = this.studentRepository.findByStudentSr(studentSr).getId();
//		List<Address> address = (List<Address>) addressRespository.findByStudentId(id);
//		return ResponseEntity.ok(address);
//	}
	
//	Delete Student Courses API

	@DeleteMapping("/studentCourseDelete/{studentId}/{courseId}")
	public ResponseEntity<?> deleteStudentCourses(@PathVariable int studentId, @PathVariable int courseId) {
		
		if (this.studentCourseService.deleteStudentCourse(studentId, courseId)) {
			return ResponseEntity.ok()
					.body(new ResponsePage(Messages.SUCCESS, "You have deleted student course successfully"));
		}

		return ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, "Something went wrong"));

	}

}
