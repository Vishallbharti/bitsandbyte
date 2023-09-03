package com.bitsandbyte.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bitsandbyte.home.model.User;
import com.bitsandbyte.home.repository.UserRepository;
import  org.springframework.security.core.userdetails.UserDetailsService;
@Service
public class UserDetailsServiceImp implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = this.userRepository.findByUsername(username);
		if (user == null) {
			try {
				System.out.println("Invalid crediential");
				throw new UsernameNotFoundException("Invalid crediential!");
			} catch (Exception e) {
				// TODO: handle exception
				e.getStackTrace();
			}
		}
		return user;
	}

}
