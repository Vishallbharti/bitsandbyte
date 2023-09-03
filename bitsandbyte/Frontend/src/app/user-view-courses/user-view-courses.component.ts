import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-view-courses',
  templateUrl: './user-view-courses.component.html',
  styleUrls: ['./user-view-courses.component.css']
})
export class UserViewCoursesComponent implements OnInit {

  id: any;
  @Input()
  public searchText = "";
  user: any;
  courseList: Course = new Course();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private loginService: LoginService,
    private route: ActivatedRoute, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.courseService.getCourseById(this.id).subscribe(data => this.courseList = data);
    this.user = this.loginService.getUser();
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
