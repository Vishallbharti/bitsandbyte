import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { CourseService } from '../service/course.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  courseList: any;
  studentList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
@Input()
public searchText = "";


  constructor(private observer: BreakpointObserver, private courseService: CourseService, private studentService: StudentService
    , private router: Router) { }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe((data) => this.courseList = data);
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

  logout() {
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }

  viewCourse(id: any) {
    this.router.navigate(["/studentViewCourse", id]);
  }

}
