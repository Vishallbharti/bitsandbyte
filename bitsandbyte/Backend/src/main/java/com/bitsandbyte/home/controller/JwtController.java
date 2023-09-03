package com.bitsandbyte.home.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bitsandbyte.home.helper.JwtUtil;
import com.bitsandbyte.home.model.JwtResponse;
import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.service.UserDetailsServiceImp;

@RestController
@CrossOrigin("*")
public class JwtController {

	@Autowired
	private UserDetailsServiceImp userDetailsServiceImp;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired(required=true)
	private AuthenticationManager authenticationManager;
	
	
	@PostMapping("generate-token")
	public ResponseEntity<JwtResponse> generateToken(@RequestBody User user) throws Exception{
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		} catch (Exception e) {
			// TODO: handle exception
			e.getStackTrace();
			throw new Exception("Bad credentials");
		}
		UserDetails userDetails = this.userDetailsServiceImp.loadUserByUsername(user.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println(token);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	// this api is used for getting current user 
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return (User)this.userDetailsServiceImp.loadUserByUsername(principal.getName());
	}
}
