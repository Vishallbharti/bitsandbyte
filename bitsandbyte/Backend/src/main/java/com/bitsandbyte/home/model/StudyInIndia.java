package com.bitsandbyte.home.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StudyInIndia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private LocalDate time;
	private String name;
	private String phone;
	private String email;
	private String collegeAddress;
	private String collegeName;
	private String collegeCourse;
	private int budget;
	
	
	
	public StudyInIndia( LocalDate time, String name, String phone, String email, String collegeAddress,
			String collegeName, String collegeCourse, int budget) {
		super();
	
		this.time = time;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.collegeAddress = collegeAddress;
		this.collegeName = collegeName;
		this.collegeCourse = collegeCourse;
		this.budget = budget;
	}
	
	
	
	
	
	
	public StudyInIndia(int id, LocalDate time, String name, String phone, String email, String collegeAddress,
			String collegeName, String collegeCourse, int budget) {
		super();
		this.id = id;
		this.time = time;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.collegeAddress = collegeAddress;
		this.collegeName = collegeName;
		this.collegeCourse = collegeCourse;
		this.budget = budget;
	}






	public StudyInIndia() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public LocalDate getTime() {
		return time;
	}
	public void setTime(LocalDate time) {
		this.time = time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCollegeAddress() {
		return collegeAddress;
	}
	public void setCollegeAddress(String collegeAddress) {
		this.collegeAddress = collegeAddress;
	}
	public String getCollegeName() {
		return collegeName;
	}
	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}
	public String getCollegeCourse() {
		return collegeCourse;
	}
	public void setCollegeCourse(String collegeCourse) {
		this.collegeCourse = collegeCourse;
	}
	public int getBudget() {
		return budget;
	}
	public void setBudget(int budget) {
		this.budget = budget;
	}

	

	@Override
	public String toString() {
		return "StudyInIndia [id=" + id + ", time=" + time + ", name=" + name + ", phone=" + phone + ", email=" + email
				+ ", collegeAddress=" + collegeAddress + ", collegeName=" + collegeName + ", collegeCourse="
				+ collegeCourse + ", budget=" + budget + "]";
	}


}
