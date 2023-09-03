package com.bitsandbyte.home.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bitsandbyte.home.service.UserDetailsServiceImp;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private UserDetailsServiceImp userDetailsServiceImp;
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf()
		.disable()
		.cors()
		.disable()
		.authorizeRequests()
		.antMatchers("/generate-token","/user/").permitAll()
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.anyRequest().authenticated()
		.and()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsServiceImp).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean 
	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/getNotice");
		web.ignoring().antMatchers("/allBlog");
		web.ignoring().antMatchers("/updateNotice");
		web.ignoring().antMatchers("/createNotice");
		web.ignoring().antMatchers("/countPendingBlog");
		web.ignoring().antMatchers("/countAllBlog");
		web.ignoring().antMatchers("/getMessage");
		web.ignoring().antMatchers("/getStudentMessage");
		web.ignoring().antMatchers("/createMessage/**");
		web.ignoring().antMatchers("/course/**");
		web.ignoring().antMatchers("/material/**");
		web.ignoring().antMatchers("/student/**");
		web.ignoring().antMatchers("/studentMessage/**");
		web.ignoring().antMatchers("/studentCourse/**");
		web.ignoring().antMatchers("/user/**");
		web.ignoring().antMatchers("/getBlogById/**");
		web.ignoring().antMatchers("/updateUserPassword");
		web.ignoring().antMatchers("/studentCourse/**");
		web.ignoring().antMatchers("/studyInIndia/**");
		
		
		
		
		
		
		
		
		
	}

	
}
