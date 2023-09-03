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
public class Notice {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int noticeId;
	private LocalDate time;
	private String title;
	private String link;
	
	
	public Notice() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	


	public Notice(LocalDate time, String title, String link) {
		super();
		this.time = time;
		this.title = title;
		this.link = link;
	}

	public LocalDate getTime() {
		return time;
	}


	public void setTime(LocalDate time) {
		this.time = time;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getLink() {
		return link;
	}


	public void setLink(String link) {
		this.link = link;
	}


	public int getNoticeId() {
		return noticeId;
	}


	public void setNoticeId(int noticeId) {
		this.noticeId = noticeId;
	}


	@Override
	public String toString() {
		return "Notice [noticeId=" + noticeId + ", time=" + time + ", title=" + title + ", link=" + link + "]";
	}
	
	
	
	
}