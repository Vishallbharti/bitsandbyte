import { AnimateChildOptions } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Address } from '../model/Address';
import { Student } from '../model/Student';
import { StudentCourseService } from '../service/student-course.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  
  student: Student = new Student;
  addressList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  studentCourse:any;

  constructor(private observer: BreakpointObserver, private studentService: StudentService
    , private router: Router,private studentCourseService: StudentCourseService) {
  }

  ngOnInit(): void {
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.student = data);
    this.studentService.getStudentAddressByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.addressList = data);
  
    this.studentCourseService.getCoursesByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.studentCourse=data);
  
    this.studentCourseService.getCoursesByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>console.log(data));
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

  logout() {
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }
}
