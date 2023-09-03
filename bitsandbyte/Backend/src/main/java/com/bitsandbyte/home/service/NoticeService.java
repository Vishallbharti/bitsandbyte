package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.Notice;
import com.bitsandbyte.home.repository.NoticeRepository;

@Service
public class NoticeService {

	@Autowired
	private NoticeRepository noticeRepository ;

	//create

	public boolean insertNotice(Notice notice) {
		this.noticeRepository.save(notice);
		return true;
	}


	//delete notice

	public boolean deleteNotice(int noticeId) {
		if (this.noticeRepository.existsById(noticeId)) {
			this.noticeRepository.deleteById(noticeId);
			return true;
		}
		return false;
	}

	//update Notice

	public boolean updateNotice(Notice notice) {
		if (this.noticeRepository.existsById(notice.getNoticeId())) {
			this.noticeRepository.save(notice);
			return true;
		}
		return false;
	}

}
