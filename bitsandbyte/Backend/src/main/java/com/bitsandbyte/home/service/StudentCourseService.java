package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.StudentCourse;
import com.bitsandbyte.home.repository.StudentCourseRepository;

@Service
public class StudentCourseService {
	@Autowired
	private StudentCourseRepository studentCourseRepository;
	
	public boolean studentCourseIds(StudentCourse StudentCourse) {
		this.studentCourseRepository.save(StudentCourse);
		return true;
	}
	
	public boolean deleteStudentCourse(int studentId,int courseId) {
		this.studentCourseRepository.deleteStudentCourse(studentId, courseId);
		return true;
	}
}