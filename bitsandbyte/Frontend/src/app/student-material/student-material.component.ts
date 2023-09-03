import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Student } from '../model/Student';
import { StudentCourseService } from '../service/student-course.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-material',
  templateUrl: './student-material.component.html',
  styleUrls: ['./student-material.component.css']
})
export class StudentMaterialComponent implements OnInit {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
 
  student:Student;
  studentList:Student= new Student();
  studentCourse:any;
  courseList: any;

  constructor(private observer: BreakpointObserver,private router:Router,
    private studentService:StudentService, private studentCourseService: StudentCourseService) {
    this.student = new Student();
  }
  ngOnInit(): void {
    // this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.studentList=data);
    this.studentCourseService.getCoursesByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.studentCourse=data);
  
    // this.studentCourseService.getCoursesByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>console.log(data));
    this.studentCourseService.getCoursesByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.courseList=data);
  
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.student = data);
    
  

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

  viewCourse(id:any){
    console.log(id);
    this.router.navigate(['/studentMaterialView',id]);
  }

  logout(){
  
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);

    
  }




}
