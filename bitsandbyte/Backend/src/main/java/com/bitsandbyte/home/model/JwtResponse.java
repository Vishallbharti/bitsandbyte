package com.bitsandbyte.home.model;

public class JwtResponse {
	private String token;

	public JwtResponse() {

	}

	public JwtResponse(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "JwtReponse [token=" + token + "]";
	}

}
