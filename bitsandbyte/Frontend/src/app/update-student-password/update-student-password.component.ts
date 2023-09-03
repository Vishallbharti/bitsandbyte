import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-update-student-password',
  templateUrl: './update-student-password.component.html',
  styleUrls: ['./update-student-password.component.css']
})
export class UpdateStudentPasswordComponent implements OnInit {

  token:any;
  student:Student = new Student();
  constructor(private route : ActivatedRoute,private studentService:StudentService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParam)=>{
      this.token = queryParam;
 
   
    });

    // this.route.params.forEach((params: Params) => {
    
    //   this.token = params['token'];
    //   console.log(this.token);
    // });

  }


  
  updateStudentPassword(){
 
  
    
   this.student.token=this.token.token;

   console.log(this.student);
   let that = this;
   this.studentService.updateStudentPassword(this.student)
     .subscribe({
       next(data: { description: any; }) {
   
        console.log("data: ", data);
         Swal.fire('Success', 'Password Updated!', 'success').then(function(){
           window.location.reload();
         });
         that.router.navigate(['/studentLogin']);
       },
       error(data: { error: { description: string; }; }): any {

        console.log("data: ", data);
         that.router.navigate(['/forgotStudentPassword']);
       }
     });




  
     }
}
