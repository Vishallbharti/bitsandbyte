import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-view-course',
  templateUrl: './admin-view-course.component.html',
  styleUrls: ['./admin-view-course.component.css']
})
export class AdminViewCourseComponent implements OnInit {

  @Input()
  public searchText = "";
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isError: boolean = false;
  errMessage: string = '';
  courseList: any;

  constructor(private observer: BreakpointObserver, private courseService: CourseService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe((data) => this.courseList = data);

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

  deleteCourse(id: number) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe((data) => {
          this.router.navigate(['/adminViewCourse']);
        }, err => {
          console.log(err);
          this.router.navigate(['/adminViewCourse']);
        })
        Swal.fire(
          'Deleted!',
          'Course has been deleted.',
          'success'
        ).then(function () {
          window.location.reload();
        });
      }
    })
  }

  viewCourse(id: any) {
    this.router.navigate(['/adminViewCourseDetail', id]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
