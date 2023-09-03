package com.bitsandbyte.home.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StudentMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private LocalDate time;
	private String studentSubject;
	private String studentMessage;
	private String userName;
	private String userId;
	private String reply;
	
	
	public StudentMessage() {
		super();
		// TODO Auto-generated constructor stub
	}


	public StudentMessage(LocalDate time, String studentSubject, String studentMessage, String userName, String userId,
			String reply) {
		super();
		this.time = time;
		this.studentSubject = studentSubject;
		this.studentMessage = studentMessage;
		this.userName = userName;
		this.userId = userId;
		this.reply = reply;
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


	public String getStudentSubject() {
		return studentSubject;
	}


	public void setStudentSubject(String studentSubject) {
		this.studentSubject = studentSubject;
	}


	public String getStudentMessage() {
		return studentMessage;
	}


	public void setStudentMessage(String studentMessage) {
		this.studentMessage = studentMessage;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getReply() {
		return reply;
	}


	public void setReply(String reply) {
		this.reply = reply;
	}


	@Override
	public String toString() {
		return "StudentMessage [id=" + id + ", time=" + time + ", studentSubject=" + studentSubject
				+ ", studentMessage=" + studentMessage + ", userName=" + userName + ", userId=" + userId + ", reply="
				+ reply + "]";
	}
	
	
	
	
	

}
