import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Message } from '../model/Message';
import { StudentMessage } from '../model/StudentMessage';
import { StudentMessageService } from '../service/student-message.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  studentMessage: StudentMessage;
  student: any;
  messageList: any;

  @Input()
  public searchText = "";


  constructor(private observer: BreakpointObserver, private studentService: StudentService
    , private studentMessageService: StudentMessageService, private router: Router) {
    this.studentMessage = new StudentMessage();
  }

  ngOnInit(): void {
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data) => this.student = data);
    this.studentMessageService.getMessage().subscribe((data)=>this.messageList = data);
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

  sendMessage() {
    this.studentMessage.userId = this.student.studentSr;
    this.studentMessage.userName = this.student.studentName;
    console.log(this.studentMessage);
    let that = this;
    this.studentMessageService.addStudentMessage(this.studentMessage)
      .subscribe({
        next(data: { description: any; }) {
          Swal.fire('Success', 'Message Sent!', 'success').then(function () {
            window.location.reload();
          });
          that.router.navigate(['/message']);
        },
        error(data: { error: { description: string; }; }): any {
          that.router.navigate(['/message']);
        }
      });
  }

  logout(){
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }

}
