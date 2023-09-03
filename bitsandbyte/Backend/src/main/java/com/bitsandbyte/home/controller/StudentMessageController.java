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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.model.StudentMessage;
import com.bitsandbyte.home.repository.StudentMessageRepository;
import com.bitsandbyte.home.service.StudentMessageService;


@RequestMapping("/studentMessage")
@RestController
@CrossOrigin
public class StudentMessageController {
	
	@Autowired
	private StudentMessageService studentMessageService;
	
	@Autowired
	private StudentMessageRepository studentMessageRepository;
	
	@PostMapping("/createStudentMessage")
	public ResponseEntity<?> createMessage(@RequestBody StudentMessage studentMessage){
		
		LocalDate lt = LocalDate.now();
		studentMessage.setTime(lt);
		if(this.studentMessageService.insertStudentMessage(studentMessage)) {
			
			return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS,"You have created message"));
		}
		else {
			return ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE,"Something went wrong"));
		}
		
		
	}
	
	//update api
	
//		@PutMapping("/updateStudentMessage")
//		public ResponseEntity<?> updateMessage(@RequestBody StudentMessage studentMessage){
//			if(this.studentMessageService.updateStudentMessage(studentMessage)) {
//				return ResponseEntity.ok("You have successfully updated message");
//			}
//			
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//					.body("Something went wrong, please try again");
//		}
		

		//delete
		
		@DeleteMapping("/deleteStudentMessage/{id}")
		public ResponseEntity<?> deleteMessage(@PathVariable int id){
			if(this.studentMessageService.deleteMessage(id)) {
				return ResponseEntity.ok("You have Successfully Deleted Message");
			}
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Some thing went wrong, Please try agian after some time!");
		}
		
		//Read
		
		@GetMapping("/getStudentMessage")
		public List<StudentMessage> getAllMessage(){
			return studentMessageRepository.findAll();
		}
 
		
		
		

		
		
//		update
		@PutMapping("/updateStudentMessage/{id}")
		public ResponseEntity<?> editEmployee(@PathVariable int id, @RequestBody StudentMessage updateMessage){
			StudentMessage sm = studentMessageRepository.findById(id).orElseThrow();
			
			sm.setReply(updateMessage.getReply());
//			
//			if(this.studentMessageRepository.save(sm)) {
//			return ResponseEntity.ok("Successfully Updated");
			
			if(this.studentMessageService.updateStudentMessage(sm)) {
				return ResponseEntity.ok("You have successfully updated message");
			}	
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Something went wrong, please try again");

			
		}
}
