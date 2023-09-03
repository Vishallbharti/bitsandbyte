package com.bitsandbyte.home.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "material")
public class CourseMaterial {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String title;
	private String materialName;
	private String description;
	private String materialUrl;
	private int deleteType;
	private int courseId;
	private int attachmentId;

	public CourseMaterial() {
	}




	public CourseMaterial(String title, String materialName, String description, String materialUrl, int deleteType,
			int courseId, int attachmentId) {
		super();
		this.title = title;
		this.materialName = materialName;
		this.description = description;
		this.materialUrl = materialUrl;
		this.deleteType = deleteType;
		this.courseId = courseId;
		this.attachmentId = attachmentId;
	}




	public CourseMaterial(int id, String title, String materialName, String description, String materialUrl,
			int deleteType, int courseId, int attachmentId) {
		super();
		this.id = id;
		this.title = title;
		this.materialName = materialName;
		this.description = description;
		this.materialUrl = materialUrl;
		this.deleteType = deleteType;
		this.courseId = courseId;
		this.attachmentId = attachmentId;
	}




	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMaterialUrl() {
		return materialUrl;
	}

	public void setMaterialUrl(String materialUrl) {
		this.materialUrl = materialUrl;
	}

	public int getDeleteType() {
		return deleteType;
	}

	public void setDeleteType(int deleteType) {
		this.deleteType = deleteType;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public int getAttachmentId() {
		return attachmentId;
	}

	public void setAttachmentId(int attachmentId) {
		this.attachmentId = attachmentId;
	}




	public String getMaterialName() {
		return materialName;
	}




	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}




	@Override
	public String toString() {
		return "CourseMaterial [id=" + id + ", title=" + title + ", materialName=" + materialName + ", description="
				+ description + ", materialUrl=" + materialUrl + ", deleteType=" + deleteType + ", courseId=" + courseId
				+ ", attachmentId=" + attachmentId + "]";
	}


}
