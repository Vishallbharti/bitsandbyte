package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.Address;
import com.bitsandbyte.home.model.Student;
import com.bitsandbyte.home.repository.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    
    public void insertAddress(Address address) {
    	this.addressRepository.save(address);
    }
    
    public void updateAddress(Address address) {
    	if(this.addressRepository.existsById(address.getId())) {
    		this.addressRepository.save(address);
    		
    		
    	}
    	
    }
}
