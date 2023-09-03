import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Student } from '../model/Student';
import { StudentMessage } from '../model/StudentMessage';
import { LoginService } from '../service/login.service';
import { StudentMessageService } from '../service/student-message.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.css']
})
export class AdminMessageComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  msg: StudentMessage = new StudentMessage();
  idd: any;
  studentMessage: any;
  editProfileForm!: FormGroup;
  StudentMsg: StudentMessage = new StudentMessage();

  constructor(private observer: BreakpointObserver, private studentMessageService: StudentMessageService
    , private modalService: NgbModal, private fb: FormBuilder, private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.studentMessageService.getMessage().subscribe((data) => this.studentMessage = data);
    this.editProfileForm = this.fb.group({
      id: [''],
      userId: [''],
      userName: [''],
      studentMessage: [''],
      reply: ['']
    });
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

  openVerticallyCentered(content: any, message: any) {
    this.modalService.open(content, { centered: true });
    console.log(message);
    this.editProfileForm.patchValue({
      id: message.id,
      userId: message.userId,
      userName: message.userName,
      studentMessage: message.studentMessage,
      reply: message.reply
    });
  }

  updateMessage() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Your have replied a message',
      showConfirmButton: false,
      timer: 1500
    }).then(function () {
      window.location.reload();
    })
    this.msg = this.editProfileForm.getRawValue();
    this.idd = this.msg.id;
    this.studentMessageService.editStudentMessage(this.idd, this.msg).subscribe(res => {
    })
    this.modalService.dismissAll();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
