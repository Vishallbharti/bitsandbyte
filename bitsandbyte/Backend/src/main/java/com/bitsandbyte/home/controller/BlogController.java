package com.bitsandbyte.home.controller;


import java.time.LocalDate;
import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.bitsandbyte.home.helper.FileUploadHelper;
import com.bitsandbyte.home.model.Blog;
import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.repository.BlogRepository;
import com.bitsandbyte.home.repository.BlogService;
import com.bitsandbyte.home.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin
public class BlogController {
	@Autowired
	private BlogRepository blogRepository;

	@Autowired
	private BlogService blogService;

	@Autowired
	private FileUploadHelper fileUploadHelper;
	
	@Autowired
	private UserService userService;

	// This api is used for creating new blog
	@PostMapping("/createBlog")
	public ResponseEntity<?> createBlog(@RequestParam(value = "blogImage", required = false) MultipartFile blogImage,
			@RequestPart(name = "blog") String blogString) throws JsonMappingException, JsonProcessingException {
		Blog blog = new ObjectMapper().readValue(blogString, Blog.class);

		LocalDate lt = LocalDate.now();
		blog.setTime(lt);
		
		String fb = "https://www.facebook.com/bitsandbytetech";
		String ins = "https://www.instagram.com/bitsandbytetech/";
		String ln = "https://www.linkedin.com/company/bitsandbytetech";

		

		boolean flag = this.fileUploadHelper.uploadFile(blogImage);
		if (flag) {
			String imgUrl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image")
					.path(blogImage.getOriginalFilename()).toUriString();
			blog.setImgUrl(imgUrl);
		}

		if (this.blogService.createBlog(blog)) {
			String emailSub = "New question posted: \n [Topic]: " + blog.getTopic();
			String emailBody = "Question Description... \n" + "\n" + "\n" + blog.getContent() 
			+ "\n<p> \n *************Follow us on*************</p>"
					+ "<p>Facebook : "+fb +"<br>"
					+	"\n"+"Instagram : "+ins+"<br>"
					+"\n"+"Linkedin : "+ln +"</p><br>"
					+" <p>Thank You!</p>";;
			String blogUserEmail = this.userService.getUserById(blog.getUserId()).get().getEmail();	
			blogService.sendmail(emailSub, emailBody,blogUserEmail);
			System.out.println("Blog Created Successfuly!");
			return ResponseEntity.ok("You have successfully created blog!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try again after some time!");
	}

	@DeleteMapping("deleteBlog/{blogId}")
	public ResponseEntity<?> deleetBlog(@PathVariable int blogId) {
		if (this.blogService.deteleBolg(blogId)) {
			return ResponseEntity.ok("You have successfully deleted blog!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}

	@GetMapping("/allBlog")
	public ResponseEntity<List<Blog>> getAllBlog() {
		List<Blog> blogs = (List<Blog>) this.blogRepository.findAll();
		return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
	}

	@PutMapping("/updateBlog")
	public ResponseEntity<?> updateBlog(@RequestBody Blog blog) {
		if (this.blogService.updateBlog(blog)) {
			return ResponseEntity.ok("You have successfully updated blog!");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Some thing went wrong, Please try agian after some time!");
	}
	
	//Approve Blog
	
	@GetMapping("/approveBlog/{id}")
	public ResponseEntity<?> approveBlogById(@PathVariable int id){
		this.blogService.approveBlog(id);
		return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, "You have approved question!"));
	}
	
	//count blog
	
	@GetMapping("/countAllBlog")
	public int countAllBlog() {
		
		return this.blogService.countAllBlog();
	}
	
	//count pending blog
	
	@GetMapping("/countPendingBlog")
	public int countPendingBlog() {
		
		return this.blogService.countPendingBlog();
	}
	
//	get Blog by id
	@GetMapping("/getBlogById/{id}")
	public ResponseEntity<?> getBlog(@PathVariable int id){
		Blog blog = blogRepository.findById(id).orElseThrow();
		return ResponseEntity.ok(blog);
		
		
	}
	
	

}
