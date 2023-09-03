import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import { delay } from 'rxjs/operators';
import { StudyInIndia } from '../model/StudyInIndia';
import { Student } from '../model/Student';
import { StudyInIndiaService } from '../service/study-in-india.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-study-in-india',
  templateUrl: './student-study-in-india.component.html',
  styleUrls: ['./student-study-in-india.component.css']
})
export class StudentStudyInIndiaComponent implements OnInit {

  

  studentList:Student= new Student();;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  studyInIndia: StudyInIndia = new StudyInIndia();
  

  constructor(private observer: BreakpointObserver, private studentService: StudentService
    , private router: Router, private studyInIndiaService:StudyInIndiaService) { }

  ngOnInit(): void {
   
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.studentList = data);
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

  onSubmit(){
    console.log(this.studyInIndia);
    let that = this;
    this.studyInIndiaService.addStudyInIndia(this.studyInIndia)
      .subscribe({
        next(data: { description: any; }) {
          Swal.fire('Success', 'Message Sent!', 'success').then(function () {
            window.location.reload();
          });
          that.router.navigate(['/studentStudyInIndia']);
        },
        error(data: { error: { description: string; }; }): any {
          that.router.navigate(['/studentStudyInIndia']);
        }
      });
  }

  logout() {
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }


}
