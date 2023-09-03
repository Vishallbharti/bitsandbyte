import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private router : Router, private http : HttpClient) { }

   public addCourse(formData: FormData) {
     return this.http.post(`${baseUrl}/course/insert`, formData, { responseType: 'text'});
   
   }

   
  public getAllCourse(){
    return this.http.get(`${baseUrl}/course/getCourses`);
   }

   deleteCourse(id:number){
    return this.http.delete(`${baseUrl}/course/delete/`+id);
  }


   
  getCourseById(id:number){
    return this.http.get(`${baseUrl}/course/getCourse/`+id);
  }

  getCoursesByStudentId(id:number){
    return this.http.get(`${baseUrl}/studentCourse/getCourses/`+id);
  }


  getMaterialByCourseId(id:number){
    return this.http.get(`${baseUrl}/material/materialByCourseId/`+id);
  }



}
