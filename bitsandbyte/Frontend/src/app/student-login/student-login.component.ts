import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../model/Student';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  student:Student;
  isError: boolean = false;
  errMessage: string = '';

  constructor(private snack: MatSnackBar,private loginService: LoginService,public router: Router) { 
    // this.student = { 'studentSr': '', 'password': '' };
    this.student = new Student();
  }

  ngOnInit(): void {
  }

  studentLogin(){

   
    


    console.log(this.student);
    let cstudent = this.student;
    let sr :string = cstudent.studentSr!;
    let that = this;
    this.loginService.studentLogin(this.student)
    .subscribe({
      next(data: { description: string; }) {
        console.log('next call');
        localStorage.setItem('studentsr', sr);
        Swal.fire('Success', 'You have successfuly logged in as Student!', 'success');
        that.router.navigate(['studentDashboard'])
      },
      error(data: { error: { description: string; }; }): any {
        that.snack.open('Invalid Credential!', '', {
          duration: 3000,
          verticalPosition: 'top'
        });

        that.router.navigate(['studentLogin']);
      }
    });
}

}
