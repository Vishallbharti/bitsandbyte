package com.bitsandbyte.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.StudyInIndia;

@Repository
public interface StudyInIndiaRepository extends JpaRepository<StudyInIndia, Integer>{

}
