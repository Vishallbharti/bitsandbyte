package com.bitsandbyte.home.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.Blog;
import com.bitsandbyte.home.service.EnableSenderService;

@Service
public class BlogService {
	@Autowired
	private BlogRepository blogRepository;
	
	@Autowired
	private EnableSenderService sendersevice;

	// create blog
	public boolean createBlog(Blog blog) {
		if (this.blogRepository.existsById(blog.getBlogId())) {
			return false;
		}
		this.blogRepository.save(blog);
		return true;
	}

	// delete blog
	public boolean deteleBolg(int blogId) {
		if (this.blogRepository.existsById(blogId)) {
			this.blogRepository.deleteById(blogId);
			return true;
		}
		return false;
	}

	// update blog
	public boolean updateBlog(Blog blog) {
		if (this.blogRepository.existsById(blog.getBlogId())) {
			this.blogRepository.save(blog);
			return true;
		}
		return false;
	}

	//approve blog

	public void approveBlog(int id) {
		this.blogRepository.approveBlogById(id);
	}

	public int countAllBlog() {
		return (int) this.blogRepository.count();

	}

	public int countPendingBlog() {
		return (int) this.blogRepository.count();

	}

	public void sendmail(String subject, String body,String userEmailId) {
		sendersevice.sendEmail("aloksinha422@gmail.com", subject, body);
		//	sendersevice.sendEmail("alok.sinha2017@vitstudent.ac.in", subject, body);
			    sendersevice.sendEmail(userEmailId, subject, body);

	}

}
