import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Blog } from '../model/Blog';
import { User } from '../model/User';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  click: boolean = false;
  selectedFile: any;
  obj: any;
  id: any;
  currentUser: User;
  blog: Blog;
  public blogError: boolean = false;
  public queMessage: string = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  f:any;

  constructor(private observer: BreakpointObserver, private userService: UserService, private router: Router
    , private loginService: LoginService, private blogService: BlogService) {
    this.currentUser = new User();
    this.blog = new Blog();
  }

  ngOnInit(): void {
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

  onFileSelected(event: any) {
    console.log("In select event function")
   this.f= event.target.files[0].name;
    // console.log(event.target.files[0].name);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      // console.log(this.selectedFile);
    }
  }

  onSubmit(): any {
    let that = this;
    Swal.fire('Success', 'You have successfuly created blog!', 'success').then(function () {
      that.router.navigate(['/userPendingBlog']);
    });
    this.blog.userId = this.currentUser.id;
    this.blog.userName = this.currentUser.name;

    const formData: FormData = new FormData();
    formData.append('blogImage', this.selectedFile);
    formData.append('blog', new Blob([JSON
      .stringify(this.blog)], {
      type: 'application/json'
    }));
    this.blogService.addBlog(formData)
      .subscribe({
        next(data: any) {
          that.router.navigate(['/userPendingBlog']);
        },
        error(data: { error: { description: string; }; }): any {
          that.blogError = true;
          that.queMessage = data.error.description;
          that.router.navigate(['/createBlog']);
        }
      });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }
}
