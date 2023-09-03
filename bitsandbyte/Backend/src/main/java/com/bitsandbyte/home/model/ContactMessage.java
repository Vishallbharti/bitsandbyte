package com.bitsandbyte.home.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ContactMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private LocalDate time;
	private String name;
	private String phone;
	private String email;
	private String address;
	private String message;
	
	
	
	
	public ContactMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ContactMessage(LocalDate time, String name, String phone, String email, String address, String message) {
		super();
		this.time = time;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.message = message;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "StudentMessage [id=" + id + ", time=" + time + ", name=" + name + ", phone=" + phone + ", email="
				+ email + ", address=" + address + ", message=" + message + "]";
	}
	
	
	
	

	
	

}
