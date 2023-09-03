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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.Notice;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.model.StudyInIndia;
import com.bitsandbyte.home.repository.StudyInIndiaRepository;
import com.bitsandbyte.home.service.StudyInIndiaService;

@RequestMapping("/studyInIndia")
@RestController
@CrossOrigin
public class StudyInIndiaController {
	
	@Autowired
	private StudyInIndiaRepository studyInIndiaRepository;
	
	
	@Autowired
	private StudyInIndiaService studyInIndiaService;
	
	

	//api for creating Study In India
	@PostMapping("/create")
	public  ResponseEntity<?> createNotice(@RequestBody StudyInIndia studyInIndia) {

		LocalDate lt = LocalDate.now();

		studyInIndia.setTime(lt);
		System.out.println(lt);
		if(this.studyInIndiaService.insertStudyInIndia(studyInIndia)) {
			return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, "You have created StudyInIndia"));

		}
		else {
			return  ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, "Something went wrong"));
		}		
	}
	
	

	//delete
	
	@DeleteMapping("/delete/{siiId}")
	public ResponseEntity<?> deleteStudyInIndia(@PathVariable int siiId){
		if(this.studyInIndiaService.deleteStudyInIndia(siiId)) {
			return ResponseEntity.ok("You have Successfully Deleted Message");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}
	
//	Get All Details of Study In India
	@GetMapping("/getAll")
	public List<StudyInIndia> getAllStudyInIndia(){
		return studyInIndiaRepository.findAll();
				
	}
	

}
