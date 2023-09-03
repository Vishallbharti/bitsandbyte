package com.bitsandbyte.home.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailParseException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service
public class EnableSenderService {


	@Autowired
	private JavaMailSender mailsender;

	public void sendEmail(String toEmail, String subject, String body) {
		
//		SimpleMailMessage message = new SimpleMailMessage();
		MimeMessage message = mailsender.createMimeMessage();
		String result = null;
		
		try {
		MimeMessageHelper helper = new MimeMessageHelper(message);
		boolean html = true;
		helper.setFrom("bitsandbytetech@gmail.com");
		helper.setTo(toEmail);
		helper.setText(body,html);
		helper.setSubject(subject);
		result="success";

		mailsender.send(message);
		System.out.println("Mail sent successfully");
		}catch(MessagingException e) {
			throw new MailParseException(e);
		}finally {
			  if(result !="success"){
		            result="fail";
		        }
		}

		
	}


}
