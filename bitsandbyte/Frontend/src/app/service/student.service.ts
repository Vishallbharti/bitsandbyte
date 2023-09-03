import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../model/Student';
 import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private router: Router, private http: HttpClient) { }


  public addStudent(formData: FormData) {
    return this.http.post(`${baseUrl}/student/registerStudent/`, formData, { responseType: 'text' });

  }


  // update Student

  public updateStudent(formData: FormData):Observable<any>{
    return this.http.put<any>(`${baseUrl}/student/updateStudent/`, formData);
  }




  // logout

  logout() {
    localStorage.removeItem('studentSr');

  }

  // GET STUDENT DETAILS BY STUDENT SERIAL NUMBER

  getStudentByStudentSr(studentSr: string) {
    return this.http.get(`${baseUrl}/student/getStudentBySr/` + studentSr);
  }

  // get all student details

  getAllStudent(){
    return this.http.get(`${baseUrl}/student/getStudent`);
   }

  //  delete Student

  deleteStudentById(id:number){
    return this.http.delete(`${baseUrl}/student/deleteStudentById/`+id);
  }

  getStudentById(id: any) {
    return this.http.get(`${baseUrl}/student/getStudentById/` + id);
  }


  // get  Address by student id
  getAllAddress(id:any){
    return this.http.get(`${baseUrl}/student/getAddress/`+id);
   }

   getAllAddressStudent(){
    return this.http.get(`${baseUrl}/student/getAddress`);
   }


   
  // GET STUDENT ADDRESS DETAILS BY STUDENT SERIAL NUMBER

  getStudentAddressByStudentSr(studentSr: string) {
    return this.http.get(`${baseUrl}/student/studentAddress/` + studentSr);
  }


  // for sending email to forget password
  public sendEmailForgetPassword(student:Student):Observable<any>{
    return this.http.post<any>(`${baseUrl}/student/forgot-password/`, student);
  }

    // for sending email to forget password
    public updateStudentPassword(student:Student):Observable<any>{
      return this.http.put<any>(`${baseUrl}/student/updateStudentPassword/`, student);
    }
  






}
