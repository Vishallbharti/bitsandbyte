import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private http : HttpClient) { }


  public createUser(user:any):Observable<any>{
    return this.http.post<any>(`${baseUrl}/user/`, user);
  }
  


  getUserByUsername(username:any){
    return this.http.get(`${baseUrl}/user/`+username);
  }

  getUserById(id:any){
    return this.http.get(`${baseUrl}/user/getUserId/`+id);
  }

  // for sending email to forget password
  public sendEmailForgetPassword(user:any):Observable<any>{
    return this.http.post<any>(`${baseUrl}/user/forgot-password/`, user);
  }

    // for sending email to forget password
    public updateUserPassword(user:User):Observable<any>{
      return this.http.put<any>(`${baseUrl}/user/updateUserPassword/`, user);
    }
  


}
