import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent implements OnInit {

  token:any;
  user:User = new User();
  constructor(private snack: MatSnackBar,private route : ActivatedRoute,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParam)=>{
      this.token = queryParam;
 
   
    });

    // this.route.params.forEach((params: Params) => {
    
    //   this.token = params['token'];
    //   console.log(this.token);
    // });

  }


  
  updateUserPassword(){
  
   this.user.token=this.token.token;

   
   let that = this;
   this.userService.updateUserPassword(this.user)
     .subscribe({
       next(data: { description: any; }) {
        Swal.fire('Success', 'Password Updated!', 'success').then(function(){
          that.router.navigate(['/userLogin']);
        });
        
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
