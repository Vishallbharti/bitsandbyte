package com.bitsandbyte.home.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class StudentCourse {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int studentCourseId;
	private int courseId;
	private int studentId;


	public StudentCourse() {
		super();
	}

	public StudentCourse(int courseId, int studentId) {
		this.courseId = courseId;
		this.studentId = studentId;
	}

	public StudentCourse(int studentCourseId, int courseId, int studentId) {
		this.studentCourseId = studentCourseId;
		this.courseId = courseId;
		this.studentId = studentId;
	}

	public int getStudentCourseId() {
		return studentCourseId;
	}

	public void setStudentCourseId(int studentCourseId) {
		this.studentCourseId = studentCourseId;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	@Override
	public String toString() {
		return "StudentCourse{" +
				"studentCourseId=" + studentCourseId +
				", courseId=" + courseId +
				", studentId=" + studentId +
				'}';
	}
}
