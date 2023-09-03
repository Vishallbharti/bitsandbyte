import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.css']
})
export class UserBlogComponent implements OnInit {

  blogList: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user: any;

  
@Input()
public searchText = "";


  constructor(private observer: BreakpointObserver, public blogService: BlogService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
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

  userViewBlog(id: any) {
    this.router.navigate(['/userViewBlog', id]);
  }

  logout() {
    this.loginService.logout();
   this.router.navigate(['/userLogin']);

  }



}
