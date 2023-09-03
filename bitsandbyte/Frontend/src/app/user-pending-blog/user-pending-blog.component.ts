import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-pending-blog',
  templateUrl: './user-pending-blog.component.html',
  styleUrls: ['./user-pending-blog.component.css']
})
export class UserPendingBlogComponent implements OnInit {

  blogList: any;
  currentUser: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @Input()
  public searchText = "";

  constructor(private observer: BreakpointObserver, private blogService: BlogService
    , private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.blogService.getAllBlog().subscribe((data) => console.log(data));
    this.blogService.getAllBlog().subscribe((data) => this.blogList = data);
    this.currentUser = this.loginService.getUser();
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

  delete(id: number) {
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
          this.router.navigate(['/userPendingBlog']);
        }, err => {
          console.log(err);
          this.router.navigate(['/userPendingBlog']);
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
    this.router.navigate(['/userViewPendingBlog', id]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }
  
}
