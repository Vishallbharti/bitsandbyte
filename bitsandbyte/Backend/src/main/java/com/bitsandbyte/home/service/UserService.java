package com.bitsandbyte.home.service;


import java.time.*;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.model.UserRole;
import com.bitsandbyte.home.repository.RoleRepository;
import com.bitsandbyte.home.repository.UserRepository;



@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	
	private static final long EXPIRE_TOKEN_AFTER_MINUTES = 15;

	// creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User newUser = new User();
		if (this.userRepository.existsByUsername(user.getUsername()) || this.userRepository.existsByEmail(user.getEmail()) ) {
			System.out.println("User is already exist!");
			throw new Exception("User is already exist!");
		} else {
			for (UserRole ur : userRoles) {
				this.roleRepository.save(ur.getRole());
			}

			user.getUserRole().addAll(userRoles);
			newUser = this.userRepository.save(user);
		}
		return newUser;
	}

	// delete user from
	public boolean deleteUserById(Long userId) {
		this.userRepository.deleteById(userId);
		return true;
	}

	// update user
	public User updateUser(User user, Set<UserRole> userRoles) throws Exception {
		User updatedUser = new User();
		if (this.userRepository.existsById(user.getId())) {
			for (UserRole ur : userRoles) {
				this.roleRepository.save(ur.getRole());
			}

			user.getUserRole().addAll(userRoles);
			updatedUser = this.userRepository.save(user);

		} else {
			System.out.println("User does not exist!");
			throw new Exception("User does not exist!");
		}
		return updatedUser;
	}

	public Optional<User> getUserById(long userId) {
		User user = null;

		if (this.userRepository.existsById(userId)) {
			return this.userRepository.findById(userId);

		} else {
			return Optional.ofNullable(user);
		}

	}
	



	

	public String forgotPassword(String email) {

		Optional<User> userOptional = Optional
				.ofNullable(userRepository.findByEmail(email));

		if (!userOptional.isPresent()) {
			return "Invalid email id.";
		}

		User user = userOptional.get();
		user.setToken(generateToken());
		user.setTokenCreationDate(LocalDateTime.now());

		user = userRepository.save(user);

		return user.getToken();
	}

	public String resetPassword(String token, String password) {

		Optional<User> userOptional = Optional
				.ofNullable(userRepository.findByToken(token));

		if (!userOptional.isPresent()) {
			return "Invalid token.";
		}

		LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

		if (isTokenExpired(tokenCreationDate)) {
			return "Token expired.";

		}

		User user = userOptional.get();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
		user.setPassword(encodedPassword);
		user.setToken(null);
		user.setTokenCreationDate(null);

		userRepository.save(user);

		return "Your password successfully updated.";
	}

	/**
	 * Generate unique token. You may add multiple parameters to create a strong
	 * token.
	 * 
	 * @return unique token
	 */
	private String generateToken() {
		StringBuilder token = new StringBuilder();

		return token.append(UUID.randomUUID().toString())
				.append(UUID.randomUUID().toString()).toString();
	}

	/**
	 * Check whether the created token expired or not.
	 * 
	 * @param tokenCreationDate
	 * @return true or false
	 */
	private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

		LocalDateTime now = LocalDateTime.now();
	
	
		Duration diff = Duration.between(tokenCreationDate, now);

		return diff.toMinutes() >= EXPIRE_TOKEN_AFTER_MINUTES;
	}

}
