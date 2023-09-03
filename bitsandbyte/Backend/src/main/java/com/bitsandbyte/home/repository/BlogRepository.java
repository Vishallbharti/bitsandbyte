package com.bitsandbyte.home.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bitsandbyte.home.model.Blog;

@Repository
@Transactional
public interface BlogRepository extends CrudRepository<Blog, Integer>{
	@Modifying
	@Query(value = "UPDATE blog SET blog.approval_type = 1 WHERE  blog.blog_id = ?1", nativeQuery = true)
	public void approveBlogById(int blogId);



	@Query(value = "select count(*) from blog",nativeQuery = true)
	public int countAllBlog(boolean count);
	
	@Query(value = "select count(*) from blog WHERE blog.approval_type = 1",nativeQuery = true)
	public int countPendingBlog(boolean count);
	
	
}
