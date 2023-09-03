import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Notice } from '../model/Notice';
import { LoginService } from '../service/login.service';
import { NoticeService } from '../service/notice.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  notice: Notice;
  noticeList: any;
  @Input()
  public searchText = "";
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router,
    private noticeService: NoticeService, private loginService: LoginService) {
    this.notice = new Notice();

  }
  ngOnInit(): void {
    this.noticeService.getAllNotice().subscribe((data) => console.log(data));
    this.noticeService.getAllNotice().subscribe((data) => this.noticeList = data);
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

  onSubmit() {
    let that = this;
    this.noticeService.addNotice(this.notice)
      .subscribe({
        next(data: { description: any; }) {
          Swal.fire('Success', 'Notice Added!', 'success').then(function () {
            window.location.reload();
          });
          that.router.navigate(['/addNotice']);
        },
        error(data: { error: { description: string; }; }): any {
          that.router.navigate(['/addNotice']);
        }
      });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.noticeService.deleteNoticeById(id).subscribe((data) => {
        })
        Swal.fire('Notice deleted!', '', 'success').then(function () {
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


