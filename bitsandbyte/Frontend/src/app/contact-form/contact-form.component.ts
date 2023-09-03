import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ContactFormService } from '../service/contact-form.service';
import { LoginService } from '../service/login.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Input()
  public searchText = "";
  contactList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild(MatSort)
  sort!: MatSort;

  

  constructor(private observer: BreakpointObserver, private contactFormService: ContactFormService
    , private router: Router, private loginService: LoginService) {

     
     }

  ngOnInit(): void {
    this.contactFormService.getAllContact().subscribe((data) => this.contactList = data);
    this.contactList.sort = this.sort;

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.contactFormService.deleteContact(id).subscribe((data) => {
        })
        Swal.fire('Message deleted!', '', 'success').then(function () {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire('No changes', '', 'info')
      }
    })
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }
}



