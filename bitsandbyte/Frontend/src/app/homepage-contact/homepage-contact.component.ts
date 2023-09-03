import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ContactMessage } from '../model/ContactMessage';
import { ContactFormService } from '../service/contact-form.service';

@Component({
  selector: 'app-homepage-contact',
  templateUrl: './homepage-contact.component.html',
  styleUrls: ['./homepage-contact.component.css']
})
export class HomepageContactComponent implements OnInit {

 contact: ContactMessage;

  constructor(private contactService: ContactFormService,private router : Router) { 
    this.contact = new ContactMessage();

  }

  ngOnInit(): void {
   
  }

  sendMessage(){
    let that = this;


    Swal.fire('Success', 'Message Sent!', 'success').then(function(){
      window.location.reload();
    });
    this.contactService.addContactForm(this.contact)
      .subscribe({
        next(data: { description: any; }) {
         
          that.router.navigate(['/homeContact']);
        },
        error(data: { error: { description: string; }; }): any {
          that.router.navigate(['/homeContact']);
        }
      });
  }



}
