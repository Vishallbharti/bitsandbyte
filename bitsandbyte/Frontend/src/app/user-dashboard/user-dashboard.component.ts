import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';
import { NoticeService } from '../service/notice.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  noticeList: any;
  @Input()
  public searchText = "";
  user: any;
  courseList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private blogService: BlogService,
    private noticeService: NoticeService, private loginService: LoginService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.noticeService.getAllNotice().subscribe((data) => this.noticeList = data);
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

  logout() {
    this.loginService.logout();
    window.location.reload();
  }

}
