package com.bitsandbyte.home.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.Student;
import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.repository.StudentRepository;

@Service
@Transactional
public class StudentService {
	@Autowired
	private StudentRepository studentRepository;
	
	private static final long EXPIRE_TOKEN_AFTER_MINUTES = 15;

	//register new student
	public boolean insertStudent(Student student) {
		if (this.studentRepository.existsByStudentSr(student.getStudentSr()) || this.studentRepository.existsByEmail(student.getEmail())) {
			return false;
		}
		this.studentRepository.save(student);
		return true;
	}

	//update student
	public boolean updateStudent(Student student) {
		System.out.println(student);
		if (this.studentRepository.existsByStudentSr(student.getStudentSr()) && this.studentRepository.existsById(student.getId())) {
			this.studentRepository.save(student);
			return true;
		}
		
		return false;
	}
	
	
	//student login
	public boolean studentLogin(Student student) {
		List<Student> students = (List<Student>) this.studentRepository.findAll();
		if (this.studentRepository.existsByStudentSr(student.getStudentSr())) {
			for (Student stud : students) {
				if ( stud.getPassword().equals(student.getPassword())){
					return true;
				}
			}
			return false;
		}
		return false;
	}
	
	
	//delete student by student Id

	public boolean deleteStudent(int studentId) {
		if (this.studentRepository.existsById(studentId)) {
			this.studentRepository.deleteById(studentId);
			return true;
		}
		return false;
	}
	
	
	
	
	


	public String forgotPassword(String email) {

		Optional<Student> studentOptional = Optional
				.ofNullable(studentRepository.findByEmail(email));

		if (!studentOptional.isPresent()) {
			return "Invalid email id.";
		}

		
		Student student = studentOptional.get();
		student.setToken(generateToken());
		student.setTokenCreationDate(LocalDateTime.now());

		student = studentRepository.save(student);

		return student.getToken();
	}

	public String resetPassword(String token, String password) {

		Optional<Student> studentOptional = Optional
				.ofNullable(studentRepository.findByToken(token));

		if (!studentOptional.isPresent()) {
			return "Invalid token.";
		}

		LocalDateTime tokenCreationDate = studentOptional.get().getTokenCreationDate();

		if (isTokenExpired(tokenCreationDate)) {
			return "Token expired.";

		}

		Student student = studentOptional.get();
//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(password);
		student.setPassword(password);
		student.setToken(null);
		student.setTokenCreationDate(null);

		studentRepository.save(student);

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
