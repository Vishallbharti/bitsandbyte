package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.Course;
import com.bitsandbyte.home.repository.CourseRepository;

@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepository;

	// Insert new course
	public boolean insertCourse(Course course) {
		this.courseRepository.save(course);
		return true;
	}

	// delete course by course id
	public boolean deleteCourse(int cousreId) {
		this.courseRepository.deleteById(cousreId);
		return true;
	}

	// update course
	public boolean updateCourse(Course course) {
		if (this.courseRepository.existsById(course.getId())) {
			this.courseRepository.save(course);
			return true;
		}
		return false;
	}

}
