import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentMessage } from '../model/StudentMessage';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudentMessageService {

  constructor(private router : Router, private http : HttpClient) { }

// Add Student Message

addStudentMessage(studentMessage:StudentMessage): Observable<any>{
  return this.http.post<any>(`${baseUrl}/studentMessage/createStudentMessage`, studentMessage)
}

  // List of Message
  getMessage(){
    return this.http.get(`${baseUrl}/studentMessage/getStudentMessage`)
  }

  // /Add Notice
  // addNotice(notice: Notice):  Observable<any> {
  //   return this.http.post<any>(`${baseUrl}/createNotice/`, notice);
  // }

  // //List of Notice
  //  getAllNotice(){
  //   return this.http.get(`${baseUrl}/getNotice`);
  //  }

  //  //Delete Notice

  //  deleteNoticeById(id:number){
  //   return this.http.delete(`${baseUrl}/deleteNotice/`+id);
  // }

  editStudentMessage(id:any,studentMessage: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/studentMessage/updateStudentMessage/`+id, studentMessage);
  }

 





}
