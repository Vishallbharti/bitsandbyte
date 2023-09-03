package com.bitsandbyte.home.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.Student;
import com.bitsandbyte.home.model.User;

@Repository
@Transactional
public interface StudentRepository extends CrudRepository<Student, Integer> {
	
   public boolean existsByStudentSr(String studentId);
   
   public boolean existsByEmail(String email);
   
   public Student findByStudentSr(String studentId);
   
   @Modifying
   @Query(value = "UPDATE student t1, address t2 SET t2.delete_type = 1,t1.delete_type = 1 WHERE t1.id = t2.student_id and t1.student_id = ?1", nativeQuery = true)
   public void deleteByStudentId(String studentId);
   
   public Student findByEmail(String email);

 	public Student findByToken(String token);
   
   
}
	