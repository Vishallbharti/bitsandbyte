package com.bitsandbyte.home.service;


import org.springframework.stereotype.Service;

@Service
public class EmailService {
//    
//	public boolean  sendEmail(String subject, String message, String to) {
//		boolean flag = false;
//		String from = "vishal210198p@gmail.com";
//		
//		String host = "aloksinha422@gmail.com";
//		
//		//get the systen properties
//		Properties properties = System.getProperties();
//		System.out.println("PROPERTIES" + properties);
//		
//		//host set
//		properties.put("mail.smtp.host",host);
//		properties.put("mail.smtp.port","465");
//		properties.put("mail.smtp.ssl.enable","true");
//		properties.put("mail.smtp.auth","true");
//		
//		
//		Session session = Session.getInstance(properties, new Authenticator() {
//			@Override
//			protected PasswordAuthentication getPasswordAuthentication() {
//				System.out.println("Processing");
//				return new PasswordAuthentication("vishal210198p@gmail.com","Dayal@98");
//				
//			}
//		});
//		
//		session.setDebug(true);
//		
//		MimeMessage m = new MimeMessage(session);
//		
//		try {
//			//from mail
//			m.setFrom(from);
//			
//			//adding recipient to message
//			m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
//			
//			// adding subject to message
//			m.setSubject(subject);
//			
//			//adding text to message
//			m.setText(message);
//			
//			Transport.send(m);
//			
//			System.out.println("Email sent successfuly!");
//			
//			flag = true;
//		}catch(Exception e) {
//			e.getStackTrace();
//		}
//		System.out.println(flag);
//		return flag;
//		
//	}
}
