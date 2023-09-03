package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.ContactMessage;
import com.bitsandbyte.home.repository.ContactMessageRepository;

@Service
public class ContactMessageService {
	
	@Autowired
	private ContactMessageRepository contactMessageRepository;
	
	//create 
	
	public boolean insertMessage(ContactMessage studentMessage) {
		this.contactMessageRepository.save(studentMessage);
		return true;
	}
	
	//update
	
	public boolean updateMessage(ContactMessage studentMessage) {
		if(this.contactMessageRepository.existsById(studentMessage.getId())) {
			this.contactMessageRepository.save(studentMessage);
			return true;
			
		}
		
		return false;
	}
	
	//delete
	
	public boolean deleteMessage(int id) {
		if(this.contactMessageRepository.existsById(id)) {
			this.contactMessageRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
	
	
	
	
	
	

}
