import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../model/Login';
import { User } from '../model/User';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  user: User;
  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) {
    this.user = new User();
  
  }

  ngOnInit(): void {
  }

  userlogin() {
    if (this.user.username?.trim() == '' || this.user.username == null) {
      this.snack.open('Username is required!!', '', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if (this.user.password?.trim() == '' || this.user.password == null) {
      this.snack.open('Password is required!!', '', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    let cuser = this.user;
    let that = this;
    let login = this.loginService;
    this.loginService.generateToken(this.user)
      .subscribe({
        next(data: any) {

          that.loginService.loginUser(data.token);
          that.loginService.getCurrentUser().subscribe(
            (user: any) => {
              that.loginService.setUser(user);

              //redirect admin dashboard
              // redirect user dashboard
              if (that.loginService.getUserRole() == 'Admin') {
                Swal.fire('Success', 'You have successfuly logged in as admin!', 'success');
                that.router.navigate(['/adminDashboard']);
              } else if (that.loginService.getUserRole() == 'Normal') {
                Swal.fire('Success', 'You have successfuly logged in as user!', 'success');
                that.router.navigate(['/userDashboard']);
              } else {
                that.loginService.logout();
              }

            }
          );
        },
        error(data: { error: { description: string; }; }): any {
          that.snack.open('Invalid Credential!', '', {
            duration: 3000,
            verticalPosition: 'top'
          });
          that.router.navigate(['/userLogin']);
        }
      });

  }

}
