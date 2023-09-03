package com.bitsandbyte.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.service.EmailService;

@RestController
public class EmailController {
	
//	  @Autowired 
//	  private EmailService emailService;
//	  
//      @PostMapping("sendEmail")
//      public ResponseEntity<?> sendEmail(){
//    	  String to = "vishal210198p@gmail.com";
//    	  String message = "Email functionality";
//    	  String subject = "Email";
//    	  if(this.emailService.sendEmail(subject, message, to)) {
//    		  return ResponseEntity.ok("Email successfuly send");
//    	  }
//    	  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email could not sent");
//    	  
//      }
}
