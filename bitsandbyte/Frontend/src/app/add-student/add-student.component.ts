import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { Student } from '../model/Student';
import { LoginService } from '../service/login.service';

import { Address } from '../model/Address';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  url: any;
  msg = "";
  profileFile: any;
  certificateFile: any;
  student: Student;
  perAddress: Address;
  currAddress: Address;
  courseList: any;
  course: Course;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,private snack: MatSnackBar,
    public loginService: LoginService, private router: Router, private studentService: StudentService
    , private courseService: CourseService) {
    this.student = new Student();
    this.perAddress = new Address();
    this.currAddress = new Address();
    this.courseList = new Course();
    this.course = new Course();
  }

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

  addStudent() {

  }
  // Profile File
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      this.profileFile = event.target.files[0];

      console.log(this.profileFile);

    }
  }
  // Certificate File
  onFileSelected(event: any) {
    console.log("In select event function")
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.certificateFile = file;
      console.log(this.certificateFile);
    }
  }

  submit() {
    this.student.address=[];
    this.student.address?.push(this.currAddress);
    this.student.address?.push(this.perAddress);
    let that = this;

    const formData: FormData = new FormData();
    formData.append('profile', this.profileFile);
    formData.append('certificate', this.certificateFile);
    formData.append('student', new Blob([JSON
      .stringify(this.student)], {
      type: 'application/json'
    }));
    this.studentService.addStudent(formData).subscribe({
      next(data: any) {
        Swal.fire('Success', 'New Student Added!', 'success').then(function () {
          that.router.navigate(['/studentDetails']);
        });
      },
      error(data: { error: { description: string; }; }): any {
        console.log(data.error.description);
      
        that.snack.open('Student Already Exists', '', {
          duration: 3000,
          verticalPosition: 'top'
        });
        that.router.navigate(['/addStudent']);
      }
    })
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}


