import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  blogList: any;
  isError: boolean = false;
  errMessage: string = '';

  @Input()
  public searchText = "";

  user: any;

  constructor(private observer: BreakpointObserver, private blogService: BlogService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.blogService.getAllBlog().subscribe((data) => this.blogList = data);
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

  approveBlog(blogId: number) {
    let that = this;
    console.log(blogId);
    this.blogService.approveBlog(blogId)
      .subscribe({
        next(data) {

          that.router.navigate(['pendingBlog']);
          window.location.reload();
        },
        error(data: { error: { description: string; }; }): any {
          console.log('error call')
          console.log(data.error)
          that.isError = true;
          that.errMessage = data.error.description
          console.log(that.errMessage)
          that.router.navigate(['pendingBlog']);
        }
      });
  }


  deleteBlog(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.blogService.deleteBlog(id).subscribe((data) => {

          this.router.navigate(['/pendingBlog']);
        }, err => {
          console.log(err);
          this.router.navigate(['/pendingBlog']);
        })

        Swal.fire(
          'Deleted!',
          'Blog has been deleted.',
          'success'
        ).then(function () {
          window.location.reload();
        });
      }
    })

  }

  viewBlog(id: any) {
    this.router.navigate(['/adminViewBlog', id]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }


}
