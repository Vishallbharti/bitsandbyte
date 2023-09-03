import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../service/login.service';
import { delay } from 'rxjs/operators';
import { StudyInIndiaService } from '../service/study-in-india.service';
import { StudyInIndia } from '../model/StudyInIndia';

@Component({
  selector: 'app-admin-study-in-india',
  templateUrl: './admin-study-in-india.component.html',
  styleUrls: ['./admin-study-in-india.component.css']
})
export class AdminStudyInIndiaComponent implements OnInit {

  @Input()
  public searchText = "";
  contactList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  studyInIndia!: StudyInIndia ;

  constructor(private observer: BreakpointObserver,private studyInIndiaService: StudyInIndiaService
    , private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

    this.studyInIndiaService.getAllStudyInIndia().subscribe((data=>this.studyInIndia=data));
    this.studyInIndiaService.getAllStudyInIndia().subscribe((data=>console.log(data)));

   
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
        this.studyInIndiaService.deleteStudyInIndia(id).subscribe((data) => {
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
