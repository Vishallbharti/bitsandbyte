package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.StudyInIndia;
import com.bitsandbyte.home.repository.StudyInIndiaRepository;

@Service
public class StudyInIndiaService {
	
	@Autowired
	private StudyInIndiaRepository studyInIndiaRepository;
	
	
	
	//create
	public boolean insertStudyInIndia(StudyInIndia studyInIndia) {
		this.studyInIndiaRepository.save(studyInIndia);
		return true;
	}
	
	//delete notice
	public boolean deleteStudyInIndia(int siiId) {
		if (this.studyInIndiaRepository.existsById(siiId)) {
			this.studyInIndiaRepository.deleteById(siiId);
			return true;
		}
		return false;
	}


}
