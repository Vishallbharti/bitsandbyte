import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notice } from '../model/Notice';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private router: Router,private http: HttpClient) { }


  //Add Notice
  addNotice(notice: Notice):  Observable<any> {
    return this.http.post<any>(`${baseUrl}/createNotice/`, notice);
  }

  //List of Notice
   getAllNotice(){
    return this.http.get(`${baseUrl}/getNotice`);
   }

   //Delete Notice

   deleteNoticeById(id:number){
    return this.http.delete(`${baseUrl}/deleteNotice/`+id);
  }




}
