import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CourseMaterialService {

  constructor(private http : HttpClient, private router : Router) { }

  
  public addMaterial(formData: FormData) {
    return this.http.post(`${baseUrl}/material/insert`, formData, { responseType: 'text'});
  
  }

  // get All course Material
  public getAllCourseMaterial(){
    return this.http.get(`${baseUrl}/material/materials`);
   }

  //  delete course material 
   deleteCourseMaterial(id:number){
   return this.http.delete(`${baseUrl}/material/delete/`+id);
  }

  // download material
  downloadCourseMaterial(id:number){
    return this.http.get(`${baseUrl}/material/download/`+id,{ observe: 'response',responseType: 'blob' });
   }

  
//  getCourseById(id:number){
//    return this.http.get(`${baseUrl}/course/getCourse/`+id);
//  }


}
