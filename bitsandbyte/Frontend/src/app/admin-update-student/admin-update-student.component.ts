import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Address } from '../model/Address';
import { Course } from '../model/Course';
import { Student } from '../model/Student';
import { StudentCourse } from '../model/StudentCourse';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';
import { StudentCourseService } from '../service/student-course.service';
import { StudentService } from '../service/student.service';



@Component({
  selector: 'app-admin-update-student',
  templateUrl: './admin-update-student.component.html',
  styleUrls: ['./admin-update-student.component.css']
})
export class AdminUpdateStudentComponent implements OnInit {

  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  id:any;
  student:Student;
  url: any; 
  msg = "";
  profileFile:any;
  certificateFile:any;

  perAddress:Address;
  currAddress:Address;
  courseList:any;

  studentCourse:StudentCourse;
  addressList: any;
  stdId:any;
  courses:any;
  studentId:any;
  


  constructor(private observer: BreakpointObserver,private route : ActivatedRoute,private studentService :StudentService
    ,private router : Router, private modalService: NgbModal,private studentCourseService: StudentCourseService,
    private courseService: CourseService,private snack: MatSnackBar,private loginService:LoginService) { 
    this.student = new Student();
    this.perAddress = new Address();
    this.currAddress = new Address();
    this.studentCourse = new StudentCourse(0, []);

  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe((data)=>this.student=data);
    this.courseService.getAllCourse().subscribe((data)=>this.courseList=data);
    this.studentService.getAllAddress(this.id).subscribe((data)=>this.addressList=data);
    this.studentCourseService.getCoursesByStudentId(this.id).subscribe((data)=>this.courses=data);
    this.studentId=this.student.id;
    
    

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

 updateStudent(){
 
  

   this.student.address = [];

   
   
    console.log(this.currAddress);
    console.log(this.perAddress);
  this.student.address?.push(this.addressList[0]);
   this.student.address?.push(this.addressList[1]);
   console.log(this.student);
   console.log(this.addressList);
   console.log
   
   let that = this;

   const formData: FormData = new FormData();
   formData.append('profile', this.profileFile);
   formData.append('certificate', this.certificateFile);
   formData.append('student', new Blob([JSON
     .stringify(this.student)], {
     type: 'application/json'
   }));
   this.studentService.updateStudent(formData).subscribe({
     next(data: any) {
       Swal.fire('Success', 'Student details updated!', 'success').then(function () {
         that.router.navigate(['/studentDetails']);
       });
     },
     error(data: { error: { description: string; }; }): any {
       console.log(data.error.description);
       alert(data.error.description);
       that.snack.open('Student Already Exists', '', {
         duration: 3000,
         verticalPosition: 'top'
       });
       that.router.navigate(['/studentDetails']);
     }
   })

  }

  selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
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
onFileSelected(event:any){
  console.log("In select event function")
  if (event.target.files.length > 0) {
  const file = event.target.files[0];
  this.certificateFile = file;
  console.log(this.certificateFile);

 }


}

submit(){
  // console.log(this.student);
  this.student.address?.push(this.currAddress);
  this.student.address?.push(this.perAddress);
 
  console.log(this.student);

  // let that = this;
  // Swal.fire('Success', 'New Student Added!', 'success').then(function(){
  //   that.router.navigate(['/studentDetails']);
  // });

  // const formData : FormData = new FormData();
  // formData.append('profile',this.profileFile);
  // formData.append('certificate',this.certificateFile);
  // formData.append('student',new Blob([JSON
  // .stringify(this.student)],{
  //   type:'application/json'
  // }));

  // this.studentService.addStudent(formData).subscribe({
  //   next(data:any){

  //   },
  //   error(data: {error:{description: string;};}):any{
  //     that.router.navigate(['/addStudent']);
  //   }
  // })



 }


 openVerticallyCentered(content:any) {
  this.modalService.open(content, { centered: true });
}



addCourse() {
   
  let that = this;
  let n = this.studentCourse.cId.length;
  var arr_courseId:number[] = new Array(n)
  for (let i = 0; i < n; i++) {
    console.log (this.studentCourse.cId[i]);
    arr_courseId[i] = Number(this.studentCourse.cId[i]);
  }
  this.studentCourse.studentId = this.student.id as number;
 
  this.studentCourseService.addStudentCourse(this.studentCourse.studentId, arr_courseId)
    .subscribe({
      next(data: { description: any; }) {
        Swal.fire('Success', 'Course Added!', 'success').then(function () {
          location.reload();
        });
        
      },
      error(data: { error: { description: string; }; }): any {
        that.router.navigate(['/studentDetails']);
      }
    });
}

logout(){
  this.loginService.logout();
  this.router.navigate(['/userLogin']);
 }

 deleteStudentCourse(id:any){
  console.log(id);
  this.studentId=this.student.id;



  
  let that = this;
  
  this.studentCourseService.deleteStudentCourse(this.studentId, id)
    .subscribe({
      next(data: { description: any; }) {
        Swal.fire('Success', 'Course Deleted!', 'success').then(function () {
          location.reload();
        });
        
      },
      error(data: { error: { description: string; }; }): any {
        // that.router.navigate(['/studentDetails']);
        location.reload();
      }
    });
 }


}

