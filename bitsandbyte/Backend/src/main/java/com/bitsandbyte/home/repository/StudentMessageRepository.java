package com.bitsandbyte.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.StudentMessage;

@Repository
public interface StudentMessageRepository extends JpaRepository<StudentMessage, Integer> {

}
