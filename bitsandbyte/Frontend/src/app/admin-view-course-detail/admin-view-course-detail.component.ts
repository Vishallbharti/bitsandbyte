import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Course } from '../model/Course';
import { BlogService } from '../service/blog.service';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-view-course-detail',
  templateUrl: './admin-view-course-detail.component.html',
  styleUrls: ['./admin-view-course-detail.component.css']
})
export class AdminViewCourseDetailComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isError: boolean = false;
  errMessage: string = '';
  @Input()
  public searchText = "";
  id: any;
  courseList: Course = new Course();

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private loginService: LoginService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.courseService.getCourseById(this.id).subscribe(data => this.courseList = data);

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
    this.router.navigate(['/userLogin']);
  }

}
