import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';
import { NoticeService } from '../service/notice.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {

  noticeList: any;
  @Input()
  public searchText = "";
  user: any;
  courseList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private loginService: LoginService,
    private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.courseService.getAllCourse().subscribe((data) => this.courseList = data)
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

  viewCourse(id: any) {
    this.router.navigate(['userViewCourse', id]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);

  }
}
