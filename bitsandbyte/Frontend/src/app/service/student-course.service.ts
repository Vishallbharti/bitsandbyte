import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentCourse } from '../model/StudentCourse';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  constructor(private router: Router, private http: HttpClient) { }




  // add more than one courses to student
  addStudentCourse(studentid:number, courseid:number[]){
    return this.http.get<any>(`${baseUrl}/studentCourse/addCourse/${studentid}/${courseid}`);
  }

  // get courses by studentId more than one courses
  getCoursesByStudentId(id:number){
    return this.http.get(`${baseUrl}/studentCourse/getCourses/`+id);
  }

   // get courses by studentSerial Number more than one courses
   getCoursesByStudentSr(studentSr: string){
    return this.http.get(`${baseUrl}/studentCourse/studentCourseBySerial/`+studentSr);
  }


  

  

    // Delete student Course by studentId and courseId
    deleteStudentCourse(studentid:number, courseid:number){
      return this.http.delete<any>(`${baseUrl}/studentCourse/studentCourseDelete/${studentid}/${courseid}`);
    }

}
