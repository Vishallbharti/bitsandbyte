package com.bitsandbyte.home.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.model.Messages;
import com.bitsandbyte.home.model.ResponsePage;
import com.bitsandbyte.home.model.Role;
import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.model.UserRole;
import com.bitsandbyte.home.repository.BlogService;
import com.bitsandbyte.home.repository.UserRepository;
import com.bitsandbyte.home.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private BlogService blogService;

	@Autowired
	private JavaMailSender mailsender;

	// api used for creating user
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		// Encoding password with bycryptPasswordEncoder
		User newUser = new User();
		String password = user.getPassword();
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		Set<UserRole> roles = new HashSet<UserRole>();

		Role role = new Role(11L, "Normal");

		String fb = "https://www.facebook.com/bitsandbytetech";
		String ins = "https://www.instagram.com/bitsandbytetech/";
		String ln = "https://www.linkedin.com/company/bitsandbytetech";


		UserRole userRole = new UserRole(user, role);
		roles.add(userRole);
		newUser = this.userService.createUser(user, roles);
		String emailSub = "Account is created successfully";
		String emailBody = "<p>Login Credentials \n</p>"+"<p>Username : "+ user.getUsername()+"<br>"
		+"Password : "+ password
				+ "<br>"
				+ "<p>Please don't share your login credentials with anyone.</p>"
				+ "<p> \nFollow us on</p>"
				+ "<p>Facebook : "+fb +"<br>"
				+	"\n"+"Instagram : "+ins+"<br>"
				+"\n"+"Linkedin : "+ln +"</p><br>"
				+"\n <p>Thank You!</p>";
		String userEmail = user.getEmail();
		System.out.println(emailSub);
		System.out.println(emailBody);
		System.out.println(userEmail);
		//		String blogUserEmail = this.userService.getUserById(blog.getUserId()).get().getEmail();	
		blogService.sendmail(emailSub, emailBody,userEmail);


		return newUser;
	}

	@PostMapping("/admin")
	public User createAdmin(@RequestBody User user) throws Exception {
		System.out.println("it's comming");

		// Encoding password with bycryptPasswordEncoder
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

		Set<UserRole> roles = new HashSet<UserRole>();

		Role role = new Role(10L, "Admin");

		UserRole userRole = new UserRole(user, role);
		roles.add(userRole);

		return this.userService.createUser(user, roles);
	}

	// api used for getting user by username
	@GetMapping("/{username}")
	public User getUserByUsername(@PathVariable String username) {
		return this.userRepository.findByUsername(username);
	}


	//api used for getting user by userId
	@GetMapping("/getUserId/{userId}")
	public Optional<User> getUserById(@PathVariable Long userId) {
		return this.userRepository.findById(userId);
	}


	// api used for deleting user by userId
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUserByUsername(@PathVariable Long userId) {
		if (this.userService.deleteUserById(userId)) {
			return ResponseEntity.ok("User deleted succsessfuly");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong!, ");
	}

	@PutMapping("/update")
	public User updateUser(@RequestBody User user) throws Exception {
		Set<UserRole> roles = new HashSet<UserRole>();
		Role role = new Role(11L, "Normal");
		UserRole userRole = new UserRole(user, role);
		roles.add(userRole);
		return this.userService.updateUser(user, roles);
	}


	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody User user)  {

		String email = user.getEmail();

		String response = userService.forgotPassword(email);
		if (response.startsWith("Invalid")) {

			return  ResponseEntity.badRequest().body(new ResponsePage(Messages.FAILURE, response));
		}
		if (!response.startsWith("Invalid")) {	
			//			response = "http://localhost:8080/user/reset-password?token=" + response;
			response = "http://localhost:4200/updateUserPassword?token="+response;


		}

		String emailSub = "Here's the link to reset your password";

		//		String ss = "http://localhost:4200/updateUserPassword?token="+response;
		String emailBody = "<p>Hello,"
				+ "<p>You have requested to reset your password.</p>"
				+ "<p>Click the link below to change your password:</p>"
				+ "<p><a href=\"" + response+"\">Change my password</a></p>"
				+ "<br>"
				+ "<p>Ignore this email if you do remember your password, "
				+ "or you have not made the request.</p> \n";

		//		String emailBody = "Generated Token is : \n"+ response;



		//		String emailSub = "Account is created successfully";
		//		String emailBody = "Login Credentials"+"\n"+"Username : "+ user.getUsername()+ "\n" +"Password : "+ password +
		//				"\n\n"+"Please don't share your login credentials with anyone. \n\nFollow us on \n\n"+"Facebook : "+fb+"\n"+"Instagram : "+ins+"\n"+"Linkedin : "+ln+"\n\nThank You!";

		System.out.println(emailSub);
		System.out.println(emailBody);
		System.out.println(email);
		//		String blogUserEmail = this.userService.getUserById(blog.getUserId()).get().getEmail();	
		blogService.sendmail(emailSub, emailBody,email);

		return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, response));






	}

	@PutMapping("/updateUserPassword")
	public ResponseEntity<?> resetPassword(@RequestBody User user) {

		String token = user.getToken();
		String password = user.getPassword();


		System.out.println(token);
		System.out.println(password);


		return ResponseEntity.ok().body(new ResponsePage(Messages.SUCCESS, userService.resetPassword(token, password)));
	}




}
