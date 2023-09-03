import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-forgot-student-password',
  templateUrl: './forgot-student-password.component.html',
  styleUrls: ['./forgot-student-password.component.css']
})
export class ForgotStudentPasswordComponent implements OnInit {


  
  spinner:boolean = false;
  student: Student = new Student();

  constructor(private snack: MatSnackBar, private studentService: StudentService, private router: Router) {

  }

  ngOnInit(): void {
  }

  sendEmail() {

    this.spinner = true;

    let that = this;
    this.studentService.sendEmailForgetPassword(this.student)
      .subscribe({

        next(data: { description: any; }) {
          that.spinner = false;
   
          Swal.fire('Email Sent!', 'Please check your mail to reset your password.', 'success').then(function () {
            window.location.reload();
          });
          that.router.navigate(['/studentLogin']);
        },
        error(data: { error: { description: string; }; }): any {
          that.spinner = false;
          that.snack.open('Invalid Email!', '', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });

  }

}
