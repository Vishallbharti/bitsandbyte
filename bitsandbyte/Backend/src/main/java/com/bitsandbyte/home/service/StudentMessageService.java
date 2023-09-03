package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.StudentMessage;
import com.bitsandbyte.home.repository.StudentMessageRepository;

@Service
public class StudentMessageService {

	@Autowired
	private StudentMessageRepository studentMessageRepository;


	//create

	public boolean insertStudentMessage(StudentMessage studentMessage) {
		this.studentMessageRepository.save(studentMessage);
		return true;
	}

	//update

	public boolean updateStudentMessage(StudentMessage studentMessage) {
		if(this.studentMessageRepository.existsById(studentMessage.getId())) {
			this.studentMessageRepository.save(studentMessage);
			return true;

		}

		return false;
	}

	//delete

	public boolean deleteMessage(int id) {
		if(this.studentMessageRepository.existsById(id)) {
			this.studentMessageRepository.deleteById(id);
			return true;
		}
		return false;
	}

}
