package com.bitsandbyte.home.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.Course;
import com.bitsandbyte.home.model.Student;
import com.bitsandbyte.home.model.StudentCourse;

@Repository
public interface StudentCourseRepository extends CrudRepository<StudentCourse, Integer>{
	
	List<Course> findByStudentId(Optional<Student> id);
	
	
	
	@Query(value = "select course_id from student_course where student_id = ?1",nativeQuery = true)
	public List<Integer> getCourseId(int studentId);
	

	@Modifying
	@Transactional
	@Query(value = "delete from student_course where student_id = ?1 and course_id = ?2", nativeQuery = true)
	public void deleteStudentCourse(int studentId, int courseId);
	
	
	
	
	
	

}
