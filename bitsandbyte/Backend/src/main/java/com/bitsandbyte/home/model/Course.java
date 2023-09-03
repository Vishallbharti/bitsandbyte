package com.bitsandbyte.home.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String courseName;
	private String courseTitle;
	private String courseDescription;
	private String courseImgUrl;
	private int deleteType;

	public Course() {
	}

	public Course(String courseName, String courseTitle, String courseDescription, String courseImgUrl, int deleteType) {
		this.courseName = courseName;
		this.courseTitle = courseTitle;
		this.courseDescription = courseDescription;
		this.courseImgUrl = courseImgUrl;
		this.deleteType = deleteType;
	}

	public Course(int id, String courseName, String courseTitle, String courseDescription, String courseImgUrl, int deleteType) {
		this.id = id;
		this.courseName = courseName;
		this.courseTitle = courseTitle;
		this.courseDescription = courseDescription;
		this.courseImgUrl = courseImgUrl;
		this.deleteType = deleteType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseTitle() {
		return courseTitle;
	}

	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}

	public String getCourseDescription() {
		return courseDescription;
	}

	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}

	public String getCourseImgUrl() {
		return courseImgUrl;
	}

	public void setCourseImgUrl(String courseImgUrl) {
		this.courseImgUrl = courseImgUrl;
	}

	public int getDeleteType() {
		return deleteType;
	}

	public void setDeleteType(int deleteType) {
		this.deleteType = deleteType;
	}

	@Override
	public String toString() {
		return "Course{" +
				"id=" + id +
				", courseName='" + courseName + '\'' +
				", courseTitle='" + courseTitle + '\'' +
				", courseDescription='" + courseDescription + '\'' +
				", courseImgUrl='" + courseImgUrl + '\'' +
				", deleteType=" + deleteType +
				'}';
	}
}
