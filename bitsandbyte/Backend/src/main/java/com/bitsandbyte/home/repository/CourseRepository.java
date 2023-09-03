package com.bitsandbyte.home.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.Course;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {

}
