import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StudyInIndia } from '../model/StudyInIndia';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyInIndiaService {

  constructor(private router: Router, private http: HttpClient) { }

//Add Study In India
addStudyInIndia(studyInIndia: StudyInIndia):  Observable<any> {
  return this.http.post<any>(`${baseUrl}/studyInIndia/create`, studyInIndia);
}

 //List of Message in Study In India
 getAllStudyInIndia(){
  return this.http.get(`${baseUrl}/studyInIndia/getAll`);
 }

 //Delete Message in Study In India
 deleteStudyInIndia(id:number){
  return this.http.delete(`${baseUrl}/studyInIndia/delete/`+id);
}



}
