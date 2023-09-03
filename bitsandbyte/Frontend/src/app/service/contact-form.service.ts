import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactMessage } from '../model/ContactMessage';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private router : Router, private http: HttpClient) { }



// addContactForm(contact: ContactMessage): Observable<any>{
//   return this.http.post<any>(`${baseUrl}/createMessage/`,contact)
// }

  //Add Notice
  // addNotice(notice: Notice):  Observable<any> {
  //   return this.http.post<any>(`${baseUrl}/createNotice/`, notice);
  // }

addContactForm(contact: ContactMessage) : Observable<any>{
  return this.http.post<any>(`${baseUrl}/createMessage/`,contact);
}

  //List of Notice
  public getAllContact(){
    return this.http.get(`${baseUrl}/getMessage`);
   }

   deleteContact(id:number): Observable<any>{
     return this.http.delete<any>(`${baseUrl}/deleteMessage/`+id);
   }


  





}
