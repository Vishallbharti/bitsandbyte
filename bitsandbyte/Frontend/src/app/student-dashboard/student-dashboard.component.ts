import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import { CourseService } from '../service/course.service';
import { NoticeService } from '../service/notice.service';
import { StudentService } from '../service/student.service';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  noticeList: any;
  courseList: any;
  studentList: any;
  @Input()
public searchText = "";


  constructor(private observer: BreakpointObserver, private noticeService: NoticeService
    , private courseService: CourseService, private studentService: StudentService
    , private router: Router,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.noticeService.getAllNotice().subscribe((data) => this.noticeList = data);
    this.courseService.getAllCourse().subscribe((data) => this.courseList = data);
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.studentList = data);
  }

  
  
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });

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
