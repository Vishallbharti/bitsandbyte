package com.bitsandbyte.home.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.model.ContactMessage;
import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.repository.BlogService;
import com.bitsandbyte.home.repository.ContactMessageRepository;
import com.bitsandbyte.home.service.ContactMessageService;

@RestController
@CrossOrigin
public class ContactMessageController {
	

	@Autowired
	private ContactMessageRepository contactMessageRepository;
	
	@Autowired
	private ContactMessageService contactMessageService;
	
	
	@Autowired
	private BlogService blogService;
	
	//api for creating Student Message
	
	@PostMapping("/createMessage")
	public ResponseEntity<?> createMessage(@RequestBody ContactMessage studentMessage){
		
		LocalDate lt = LocalDate.now();
		studentMessage.setTime(lt);
		
		

		String fb = "https://www.facebook.com/bitsandbytetech";
		String ins = "https://www.instagram.com/bitsandbytetech/";
		String ln = "https://www.linkedin.com/company/bitsandbytetech";


		
	
		
		
		
		if(this.contactMessageService.insertMessage(studentMessage)) {
			String emailSub = "Thank you for getting in touch with Bits And Byte Institute of Technology.";
			
			String emailBody = "<p>Your message has been sent. We will contact you shortly.</p>"
			+	"<p> \nFollow us on</p>"
			+   "<p>Facebook : "+fb +"<br>"
			+	"\n"+"Instagram : "+ins+"<br>"
			+"\n"+"Linkedin : "+ln +"</p><br>"
			+"\n <p>Thank You!</p>";
			
			String userEmail = studentMessage.getEmail();
			System.out.println(emailSub);
			System.out.println(emailBody);
			System.out.println(userEmail);
			blogService.sendmail(emailSub, emailBody,userEmail);
			
			return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS,"You have created message"));
		}
		else {
			return ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE,"Something went wrong"));
		}
		
		
	}
	
	//update api
	
	@PutMapping("/updateMessage")
	public ResponseEntity<?> updateMessage(@RequestBody ContactMessage studentMessage){
		if(this.contactMessageService.updateMessage(studentMessage)) {
			return ResponseEntity.ok("You have successfully updated message");
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Something went wrong, please try again");
	}
	
	
	//delete
	
	@DeleteMapping("/deleteMessage/{id}")
	public ResponseEntity<?> deleteMessage(@PathVariable int id){
		if(this.contactMessageService.deleteMessage(id)) {
			return ResponseEntity.ok("You have Successfully Deleted Message");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}
	
	//Read
	
	@GetMapping("/getMessage")
	public List<ContactMessage> getAllMessage(){
		return contactMessageRepository.findAll(); 
				
	}
	
	
	
	

}
