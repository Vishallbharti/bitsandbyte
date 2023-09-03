import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../service/login.service';
import { StudentCourseService } from '../service/student-course.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  student: Student;
  studentList: any;
  closeResult!: string;
  addressList: any;
  studentCourse:any;
 
  constructor(private observer: BreakpointObserver, private router: Router, private studentService: StudentService
    , private modalService: NgbModal, private loginService: LoginService,private studentCourseService:StudentCourseService) {
    this.student = new Student();
  }

  ngOnInit(): void {
    this.studentService.getAllStudent().subscribe((data) => this.studentList = data);
    
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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

  editStudent(id: any) {
    this.router.navigate(['/updateStudent', id]);
  }

  viewStudent(id: any) {
    this.router.navigate(['/viewStudent', id]);
  }

  openLg(content: any, student: any) {
    
    this.modalService.open(content, { size: 'lg' });
    document.getElementById('studentSr')?.setAttribute('value', student.studentSr);
    document.getElementById('studentName')?.setAttribute('value', student.studentName);
    document.getElementById('fatherName')?.setAttribute('value', student.fatherName);
    document.getElementById('motherName')?.setAttribute('value', student.motherName);
    document.getElementById('gender')?.setAttribute('value', student.gender);
    document.getElementById('mobile')?.setAttribute('value', student.mobile);
    document.getElementById('guardianMobile')?.setAttribute('value', student.guardianMobile);
    document.getElementById('blood')?.setAttribute('value', student.blood);
    document.getElementById('status')?.setAttribute('value', student.status);
    document.getElementById('email')?.setAttribute('value', student.email);
    document.getElementById('birthDay')?.setAttribute('value', student.birthDay);
    var inputValue = (<HTMLInputElement>document.getElementById('studentSr')).value;
    this.studentService.getStudentAddressByStudentSr(inputValue).subscribe((data) => this.addressList = data);
    this.studentCourseService.getCoursesByStudentSr(inputValue).subscribe((data)=>this.studentCourse=data);
  }

  deleteStudent(id:any){
  
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.deleteStudentById(id).subscribe((data) => {
        })
        Swal.fire('Student deleted!', '', 'success').then(function () {
          window.location.reload();
        });
      } else if (result.isDenied) {
        Swal.fire('No changes', '', 'info')
      }
    })
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }
}

