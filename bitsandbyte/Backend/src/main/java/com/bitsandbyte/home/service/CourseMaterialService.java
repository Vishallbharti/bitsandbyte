package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.CourseMaterial;
import com.bitsandbyte.home.repository.CourseMaterialRepository;

import java.util.Optional;

@Service
public class CourseMaterialService {
       
	@Autowired
	private CourseMaterialRepository courseMaterialRepository;
	
	// insert material
	public boolean insertCourseMaterial(CourseMaterial courseMaterial) {
		this.courseMaterialRepository.save(courseMaterial);
		return true;
	}
	
	// delete material
	public boolean deleteMaterial(int materialId) {
		this.courseMaterialRepository.deleteById(materialId);
		return true;
	}

	public Optional<CourseMaterial> getMaterialById(int materialId){
		Optional<CourseMaterial> courseMaterial = null;
		courseMaterial =  this.courseMaterialRepository.findById(materialId);
		return courseMaterial;
	}
	// update material
	public boolean updateCourseMaterial(CourseMaterial courseMaterial) {
		if(this.courseMaterialRepository.existsById(courseMaterial.getId())) {
			this.courseMaterialRepository.save(courseMaterial);
			return true;
		}
		return false;
	}
}
