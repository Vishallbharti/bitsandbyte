import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Course } from '../model/Course';
import { Student } from '../model/Student';
import { CourseService } from '../service/course.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-view-course',
  templateUrl: './student-view-course.component.html',
  styleUrls: ['./student-view-course.component.css']
})
export class StudentViewCourseComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  studentList:Student = new Student();
  id:any;
  courseList:Course = new Course();

  constructor(private observer: BreakpointObserver,private studentService:StudentService,private router:Router,
    private route : ActivatedRoute,private courseService: CourseService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  
     this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.studentList=data);
    this.courseService.getCourseById(this.id).subscribe(data=>this.courseList=data);
    this.courseService.getCourseById(this.id).subscribe(data=>console.log(data));
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


  logout(){
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);

    
  }


}
