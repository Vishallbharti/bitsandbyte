import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Blog } from '../model/Blog';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course: Course;
  selectedFile: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router
    , private courseService: CourseService, private loginService: LoginService) {
    this.course = new Course();
  }
  ngOnInit(): void {
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

  onSubmit(): any {
    let that = this;
    Swal.fire('success', 'New Course Added!', 'success').then(function () {
      that.router.navigate(['/adminViewCourse']);
    });
    const formData: FormData = new FormData();
    formData.append('courseImg', this.selectedFile);
    formData.append('course', new Blob([JSON
      .stringify(this.course)], {
      type: 'applicaton/json'
    }));
    this.courseService.addCourse(formData)
      .subscribe({
        next(data: any) {
          that.router.navigate(['addCourse']);
        },
        error(data: { error: { description: string; }; }): any {
          console.log(this.error);
          that.router.navigate(['/addCourse']);
        }
      })
  }

  onFileSelected(event: any) {
    console.log("In select event function")
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      console.log(this.selectedFile);
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
