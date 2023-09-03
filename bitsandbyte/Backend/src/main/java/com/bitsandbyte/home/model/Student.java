package com.bitsandbyte.home.model;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(name = "studentSr", nullable = false, unique = true)
	private String studentSr;
	@Column(name = "password", nullable = false, unique = true)
	private String password;
	@Column(name = "studentName", nullable = false)
	private String studentName;
	@Column(name = "fatherName", nullable = false)
	private String fatherName;
	@Column(name = "motherName", nullable = false)
	private String motherName;

	private Date birthDay;
	@Column(name = "gender", nullable = false)
	private String gender;
	@Column(name = "mobile", nullable = false)
	private String mobile;
	private String guardianMobile;
	private String blood;
	private String status;
	@Column(name = "email", nullable = false)
	private String email;
	@Column(name = "deleteType", nullable = false)
	private int deleteType;
	@Column(name = "studentProfile")
	private String studentProfile;
	@Column(name = "studentCertificate")
	private String studentCertificate;
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getTokenCreationDate() {
		return tokenCreationDate;
	}

	public void setTokenCreationDate(LocalDateTime tokenCreationDate) {
		this.tokenCreationDate = tokenCreationDate;
	}

	private String token;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime tokenCreationDate;
	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	@JsonBackReference
	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
	private List<Address> address;

	public Student() {
		super();
	}

	public Student(String studentSr, String password) {
		super();
		this.studentSr = studentSr;
		this.password = password;
	}

	public Student(String studentSr, String password, String studentName, String fatherName, String motherName,
			Date birthDay, String gender, String mobile, String guardianMobile, String blood, String status,
			String email, int deleteType, String studentProfile, String studentCertificate, List<Address> address) {
		super();
		this.studentSr = studentSr;
		this.password = password;
		this.studentName = studentName;
		this.fatherName = fatherName;
		this.motherName = motherName;
		this.birthDay = birthDay;
		this.gender = gender;
		this.mobile = mobile;
		this.guardianMobile = guardianMobile;
		this.blood = blood;
		this.status = status;
		this.email = email;
		this.deleteType = deleteType;
		this.studentProfile = studentProfile;
		this.studentCertificate = studentCertificate;
		this.address = address;
	}

	public Student(int id, String studentSr, String password, String studentName, String fatherName, String motherName,
			Date birthDay, String gender, String mobile, String guardianMobile, String blood, String status,
			String email, int deleteType, String studentProfile, String studentCertificate, List<Address> address) {
		super();
		this.id = id;
		this.studentSr = studentSr;
		this.password = password;
		this.studentName = studentName;
		this.fatherName = fatherName;
		this.motherName = motherName;
		this.birthDay = birthDay;
		this.gender = gender;
		this.mobile = mobile;
		this.guardianMobile = guardianMobile;
		this.blood = blood;
		this.status = status;
		this.email = email;
		this.deleteType = deleteType;
		this.studentProfile = studentProfile;
		this.studentCertificate = studentCertificate;
		this.address = address;
	}
	


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStudentSr() {
		return studentSr;
	}

	public void setStudentSr(String studentSr) {
		this.studentSr = studentSr;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getGuardianMobile() {
		return guardianMobile;
	}

	public void setGuardianMobile(String guardianMobile) {
		this.guardianMobile = guardianMobile;
	}

	public String getBlood() {
		return blood;
	}

	public void setBlood(String blood) {
		this.blood = blood;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getDeleteType() {
		return deleteType;
	}

	public void setDeleteType(int deleteType) {
		this.deleteType = deleteType;
	}

	public String getStudentProfile() {
		return studentProfile;
	}

	public void setStudentProfile(String studentProfile) {
		this.studentProfile = studentProfile;
	}

	public String getStudentCertificate() {
		return studentCertificate;
	}

	public void setStudentCertificate(String studentCertificate) {
		this.studentCertificate = studentCertificate;
	}

	public List<Address> getAddress() {
		return address;
	}

	public void setAddress(List<Address> address) {
		this.address = address;
	}


	@Override
	public String toString() {
		return "Student{" +
				"id=" + id +
				", studentSr='" + studentSr + '\'' +
				", password='" + password + '\'' +
				", studentName='" + studentName + '\'' +
				", fatherName='" + fatherName + '\'' +
				", motherName='" + motherName + '\'' +
				", birthDay=" + birthDay +
				", gender='" + gender + '\'' +
				", mobile='" + mobile + '\'' +
				", guardianMobile='" + guardianMobile + '\'' +
				", blood='" + blood + '\'' +
				", status='" + status + '\'' +
				", email='" + email + '\'' +
				", deleteType=" + deleteType +
				", studentProfile='" + studentProfile + '\'' +
				", studentCertificate='" + studentCertificate + '\'' +
				", address=" + address +
				'}';
	}
}
