package com.bitsandbyte.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitsandbyte.home.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
  
	public boolean existsByUsername(String username);
  
  public User findByUsername(String username);
  
  public boolean existsByEmail(String email);
  
  public boolean deleteByUsername(String username);
  
  public User findByEmail(String email);

	public User findByToken(String token);
}
	