package com.bitsandbyte.home.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Blog {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int blogId;
	private LocalDate time;
	private String topic;
	private String content;
	private int approvalType;
	private int deleteType;
	private int userId;
	private String userName;
	private String imgUrl;

	public Blog() {
		super();
	}


	
	public Blog(LocalDate time, String topic, String content, int approvalType, int deleteType, int userId,
			String userName, String imgUrl) {
		super();
		this.time = time;
		this.topic = topic;
		this.content = content;
		this.approvalType = approvalType;
		this.deleteType = deleteType;
		this.userId = userId;
		this.userName = userName;
		this.imgUrl = imgUrl;
	}



	public LocalDate getTime() {
		return time;
	}



	public void setTime(LocalDate time) {
		this.time = time;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public int getBlogId() {
		return blogId;
	}

	public void setBlogId(int blogId) {
		this.blogId = blogId;
	}

	
	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getApprovalType() {
		return approvalType;
	}

	public void setApprovalType(int approvalType) {
		this.approvalType = approvalType;
	}

	public int getDeleteType() {
		return deleteType;
	}

	public void setDeleteType(int deleteType) {
		this.deleteType = deleteType;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}



	@Override
	public String toString() {
		return "Blog [blogId=" + blogId + ", time=" + time + ", topic=" + topic + ", content=" + content
				+ ", approvalType=" + approvalType + ", deleteType=" + deleteType + ", userId=" + userId + ", userName="
				+ userName + ", imgUrl=" + imgUrl + "]";
	}

	

}
