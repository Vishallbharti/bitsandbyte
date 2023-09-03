package com.bitsandbyte.home.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bitsandbyte.home.helper.FileUploadHelper;
import com.bitsandbyte.home.model.Address;
import com.bitsandbyte.home.model.Course;
import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.model.Student;
import com.bitsandbyte.home.model.StudentCourse;
import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.repository.AddressRepository;
import com.bitsandbyte.home.repository.BlogService;
import com.bitsandbyte.home.repository.StudentRepository;
import com.bitsandbyte.home.service.AddressService;
import com.bitsandbyte.home.service.StudentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.bytebuddy.asm.Advice.This;

@RestController
@CrossOrigin
@RequestMapping("/student")
public class StudentController {

	/**
	 * @see This is the student controller
	 * @author Vishal Bharti
	 * @since 28-Jan-2022
	 * 
	 */
	@Autowired
	private FileUploadHelper fileUploadHelper;
	@Autowired
	private StudentService studentService;

	@Autowired
	private AddressService addressService;

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private BlogService blogService;

	@Autowired
	private AddressRepository addressRespository;
	
	@PostMapping("/registerStudent")
	/**
	 * @see this api is used for register new student
	 * @param student
	 * @return Response entity type message
	 */
	public ResponseEntity<?> studentRegister(@RequestParam(value = "profile", required = false) MultipartFile profile,
			@RequestParam(value = "certificate", required = false) MultipartFile certificate,
			@RequestPart(name = "student" ) String studentString) throws JsonMappingException, JsonProcessingException {
	
		Student student = new ObjectMapper().readValue(studentString, Student.class);
		Student student1 = new Student();
		boolean flag = false;
		boolean flagCertificate = false;
		
		student1.setStudentSr(student.getStudentSr());
		student1.setStudentName(student.getStudentName());
		student1.setBirthDay(student.getBirthDay());
		student1.setEmail(student.getEmail());
		student1.setFatherName(student.getFatherName());
		student1.setMotherName(student.getMotherName());
		student1.setGender(student.getGender());
		student1.setMobile(student.getMobile());
		student1.setGuardianMobile(student.getGuardianMobile());
		student1.setBlood(student.getBlood());
		student1.setStatus(student.getStatus());
		student1.setBirthDay(student.getBirthDay());
		student1.setPassword(student.getPassword());
		
		// uploading student profile picture
		
		if(profile!=null) {
		 flag = this.fileUploadHelper.uploadFile(profile);
		}

		if (flag) {
			String imgUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(profile.getOriginalFilename()).toUriString();
			student1.setStudentProfile(imgUrl);
		}

		// uploading student certificate
		if(certificate!=null) {
			flagCertificate = this.fileUploadHelper.uploadFile(certificate);
		}

		if (flagCertificate) {
			String certificateUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(certificate.getOriginalFilename()).toUriString();
			student1.setStudentCertificate(certificateUrl);

		}
 
		// saving student details in database
		if (this.studentService.insertStudent(student1)) {
			Student registeredStudent = this.studentRepository.findByStudentSr(student1.getStudentSr());
			for (Address address : student.getAddress()) {
				System.out.println(address);
				address.setStudent(registeredStudent);
				this.addressService.insertAddress(address);
			}
			
			return ResponseEntity.ok()
					.body(new ResponsePage(Messages.SUCCESS, "You have successfuly updated student!"));

		}
		return ResponseEntity.badRequest()
				.body(new ResponsePage(Messages.FAILURE, "Error"));

	}
	
	
	@PutMapping("/updateStudent")
	/**
	 * @see this api is used for update new student
	 * @param student
	 * @return Response entity type message
	 */
	public ResponseEntity<?> studentUpdate(@RequestParam(value = "profile", required = false) MultipartFile profile,
			@RequestParam(value = "certificate", required = false) MultipartFile certificate,
			@RequestPart(name = "student" ) String studentString) throws JsonMappingException, JsonProcessingException {
		
		Student student = new ObjectMapper().readValue(studentString, Student.class);
		Student student1 = new Student();
		System.out.println(profile);
		System.out.println(certificate);
		System.out.println(student);
		boolean flag = false;
		boolean flagCertificate = false;
		student1.setId(student.getId());
		student1.setStudentSr(student.getStudentSr());
		student1.setStudentName(student.getStudentName());
		student1.setBirthDay(student.getBirthDay());
		student1.setEmail(student.getEmail());
		student1.setFatherName(student.getFatherName());
		student1.setMotherName(student.getMotherName());
		student1.setGender(student.getGender());
		student1.setMobile(student.getMobile());
		student1.setGuardianMobile(student.getGuardianMobile());
		student1.setBlood(student.getBlood());
		student1.setStatus(student.getStatus());
		student1.setBirthDay(student.getBirthDay());
		student1.setPassword(student.getPassword());
		
		// uploading student profile picture
		
		if(profile!=null) {
		 flag = this.fileUploadHelper.uploadFile(profile);
		}

		if (flag) {
			String imgUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(profile.getOriginalFilename()).toUriString();
			student1.setStudentProfile(imgUrl);
		}

		// uploading student certificate
		if(certificate!=null) {
			flagCertificate = this.fileUploadHelper.uploadFile(certificate);
		}

		if (flagCertificate) {
			String certificateUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
					.path(certificate.getOriginalFilename()).toUriString();
			student1.setStudentCertificate(certificateUrl);

		}
 
		// saving student details in database
		if (this.studentService.updateStudent(student1)) {
			Student registeredStudent = this.studentRepository.findByStudentSr(student1.getStudentSr());
			for (Address address : student.getAddress()) {
				System.out.println(address);
				address.setStudent(registeredStudent);
				this.addressService.updateAddress(address);
			}
			
			return ResponseEntity.ok()
					.body(new ResponsePage(Messages.SUCCESS, "You have successfuly registered student!"));

		}
		return ResponseEntity.badRequest()
				.body(new ResponsePage(Messages.FAILURE, "This student is already registered"));

	}
	
	
	
	

	/**
	 * @see This api is used for delete student by student id
	 * @param studentId
	 * @return Response entity type message
	 */
	
//	Delete Student By Student Serial Number
	@DeleteMapping("deleteStudent/{studentId}")
	public ResponseEntity<?> deleteStudent(@PathVariable String studentId) {
		this.studentRepository.deleteByStudentId(studentId);
		return ResponseEntity.ok("Student deleted successfuly!");
	}
	
// Delete Student By Student Id
	@DeleteMapping("/deleteStudentById/{studentId}")
	public ResponseEntity<?> deleteStudent(@PathVariable int studentId){
		if(this.studentService.deleteStudent(studentId)) {
			return ResponseEntity.ok("You have successfully deleted student");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}

	@GetMapping("getStudent")
	public ResponseEntity<List<Student>> getAllStudent() {
		List<Student> students = (List<Student>) this.studentRepository.findAll();
		return new ResponseEntity<List<Student>>(students, HttpStatus.OK);
	}

	@GetMapping("getStudentBySr/{studentId}")
    public ResponseEntity<Student> studentById(@PathVariable String studentId){
		Student student = this.studentRepository.findByStudentSr(studentId);
		return new ResponseEntity<Student>(student, HttpStatus.OK);
	}
	
//Get student details by Student Id
	
	@GetMapping("getStudentById/{studentId}")
    public ResponseEntity<?> studentById(@PathVariable int studentId){
	Optional<Student> student = this.studentRepository.findById(studentId);
	return ResponseEntity.ok(student);
	}

	
	
	@PostMapping("/studentLogin")
	public ResponseEntity<?> studentLogin(@RequestBody Student student) {
		if (this.studentService.studentLogin(student)) {
			System.out.println("Student login function call");
			return ResponseEntity.ok()
					.body(new ResponsePage(Messages.SUCCESS, "You have successfuly login as student!"));

		}
		return ResponseEntity.badRequest()
				.body(new ResponsePage(Messages.FAILURE, "username or password is wrong!"));
	}
	
	@GetMapping("getAddress")
	public ResponseEntity<List<Address>> getAllAddress() {
		List<Address> address = (List<Address>) this.addressRespository.findAll();
		return new ResponseEntity<List<Address>>(address, HttpStatus.OK);
	}
	
//	get student address by student id
	@GetMapping("/getAddress/{id}")
	public ResponseEntity<?> getAddressById(@PathVariable int id){
		List<Address> address = (List<Address>) addressRespository.findByStudentId(id);
		return ResponseEntity.ok(address);
	}
	
//	get student address by student_serialnumber
	@GetMapping("/studentAddress/{studentSr}")
	public ResponseEntity<?> getAddressByStudentSrNo(@PathVariable String studentSr){
	   int id = this.studentRepository.findByStudentSr(studentSr).getId();
	   List<Address> address = (List<Address>) addressRespository.findByStudentId(id);
	   return ResponseEntity.ok(address);
	}
	
	
	
	
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Student student)  {

	    String email = student.getEmail();
	
		String response = studentService.forgotPassword(email);
		if (response.startsWith("Invalid")) {
			return  ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, response));
		}
		if (!response.startsWith("Invalid")) {	
//			response = "http://localhost:8080/user/reset-password?token=" + response;
			response = "http://localhost:4200/updateStudentPassword?token="+response;
			
			
		}
	
		String emailSub = "Here's the link to reset your password";
	     
//		String ss = "http://localhost:4200/updateUserPassword?token="+response;
	    String emailBody = "<p>Hello,"
	            + "<p>You have requested to reset your password.</p>"
	    		+"<button ><a href=\"" + response+"\"></a></button>"
	            + "<p>Click the link below to change your password:</p>"
	            + "<p><a href=\"" + response+"\">Change my password</a></p>"
	            + "<br>"
	            + "<p>Ignore this email if you do remember your password, "
	            + "or you have not made the request.</p> \n"
	            + "<button >Click Here</button>"
	            
	            
	            
	            +response;
	    
	   
		
//		String emailBody = "Generated Token is : \n"+ response;
		
	
		
//		String emailSub = "Account is created successfully";
//		String emailBody = "Login Credentials"+"\n"+"Username : "+ user.getUsername()+ "\n" +"Password : "+ password +
//				"\n\n"+"Please don't share your login credentials with anyone. \n\nFollow us on \n\n"+"Facebook : "+fb+"\n"+"Instagram : "+ins+"\n"+"Linkedin : "+ln+"\n\nThank You!";
		
		System.out.println(emailSub);
		System.out.println(emailBody);
		System.out.println(email);
		//		String blogUserEmail = this.userService.getUserById(blog.getUserId()).get().getEmail();	
		blogService.sendmail(emailSub, emailBody,email);
		System.out.println("Valid credential");

		return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, response));
	
	}
	
	@PutMapping("/updateStudentPassword")
	public  ResponseEntity<?> resetPassword(@RequestBody Student student) {
		
		String response = "";
		String token = student.getToken();
		String password = student.getPassword();

		response= studentService.resetPassword(token, password);
		
		
		if (response.startsWith("Invalid") || response.startsWith("Token") ) {
			return  ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, response));
		}
		
	    
	   
		
		
		return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, response));
	}
	
	
	
	
	
}
