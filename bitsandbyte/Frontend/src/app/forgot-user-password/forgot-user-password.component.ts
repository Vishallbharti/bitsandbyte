import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgot-user-password',
  templateUrl: './forgot-user-password.component.html',
  styleUrls: ['./forgot-user-password.component.css']
})
export class ForgotUserPasswordComponent implements OnInit {

  user: User = new User();;

  constructor(private snack: MatSnackBar, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }

  sendEmail() {

    let that = this;
    this.userService.sendEmailForgetPassword(this.user)
      .subscribe({
        next(data: { description: any; }) {
          Swal.fire('Email Sent!', 'Please check your mail to reset your password.', 'success').then(function () {
            window.location.reload();
          });
          that.router.navigate(['/userLogin']);
        },
        error(data: { error: { description: string; }; }): any {
          that.snack.open('Invalid Email!', '', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });

  }

}
