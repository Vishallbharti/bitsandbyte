import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/Student';
import { User } from '../model/User';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

public getCurrentUser(){
  return this.http.get(`${baseUrl}/current-user`);
}
  // generate token
  public generateToken(user: User) {
    return this.http.post(`${baseUrl}/generate-token`, user);
  }

  // login user: set token in localstorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //isloggin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout : remove token from localstorage
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user
  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }
  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  // Student Login
  studentLogin(student:Student):  Observable<any> {
    return this.http.post<any>(`${baseUrl}/student/studentLogin`, student);
  }

}
