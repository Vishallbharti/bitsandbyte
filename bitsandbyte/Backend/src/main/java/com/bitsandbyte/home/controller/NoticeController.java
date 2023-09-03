package com.bitsandbyte.home.controller;

import java.time.LocalDate;

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

import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.Notice;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.repository.NoticeRepository;
import com.bitsandbyte.home.service.NoticeService;
import java.util.List;


@RestController

@CrossOrigin
public class NoticeController {

	@Autowired
	private NoticeRepository noticeRepository;

	@Autowired
	private NoticeService noticeService;
	
	
	

	//api for creating Notice
	@PostMapping("/createNotice")
	public  ResponseEntity<?> createNotice(@RequestBody Notice notice) {

		LocalDate lt = LocalDate.now();

		notice.setTime(lt);
		System.out.println(lt);
		if(this.noticeService.insertNotice(notice)) {
			return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, "You have created Notice"));

		}
		else {
			return  ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, "Something went wrong"));
		}		
	}
	
	@DeleteMapping("/deleteNotice/{noticeId}")
	public ResponseEntity<?> deleteNotice(@PathVariable int noticeId){
		if(this.noticeService.deleteNotice(noticeId)) {
			return ResponseEntity.ok("You have successfully deleted Notice");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}
	
	
	@PutMapping("/updateNotice")
	public ResponseEntity<?> updateBlog(@RequestBody Notice notice) {
		if (this.noticeService.updateNotice(notice)) {
			return ResponseEntity.ok("You have successfully updated notice!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}
	
	@GetMapping("/getNotice")
	public List<Notice> getAllNotice(){
		return noticeRepository.findAll();
				
	}
	
	
	
	
	
	
	
	
}
