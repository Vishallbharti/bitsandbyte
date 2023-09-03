import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  user:User;
  isError: boolean = false;
  errMessage: string = '';

  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {
    this.user = new User( );
   }

  userRegistration() {
   
    let cuser = this.user;
    let email1: string = cuser.email!;
    let that = this;
    if(this.user.email == '' || this.user.email == null){
      this.snackBar.open("username is required!",'',{
        duration:3000,
        verticalPosition:'top'
      });
    }
    this.userService.createUser(this.user)
      .subscribe({
        next(data: { description: any; }) {
          Swal.fire('Success','User registered successfuly!','success');
          that.router.navigate(['/userLogin']);
       },
        error(data: { error: { description: string; }; }): any {
          
          that.snackBar.open('User Already Exists', '', {
            duration: 3000,
            verticalPosition: 'top'
          });
          that.router.navigate(['/userSignUp']);
        }
      });
  }

  ngOnInit(): void {
  }

}
