import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private router :Router ,private http: HttpClient) { }


  public addBlog(formData: FormData) {
    return this.http.post(`${baseUrl}/createBlog`, formData, { responseType: 'text'});
   
  }

  public getAllBlog(){
    return this.http.get(`${baseUrl}/allBlog`);
   }

   deleteBlog(id:number){
     return this.http.delete(`${baseUrl}/deleteBlog/`+id);
   }

   approveBlog(id:number){
    return this.http.get(`${baseUrl}/approveBlog/` + id);
  }

  public countBlog(){
    return this.http.get(`${baseUrl}/countAllBlog`);
   }

  getBlogById(id:number){
    return this.http.get(`${baseUrl}/getBlogById/`+id);
  }


 





}
