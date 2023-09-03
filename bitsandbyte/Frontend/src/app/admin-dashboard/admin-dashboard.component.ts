import { Component, OnInit } from '@angular/core';
import {  ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  blog:any;
  countBlog:any;

  constructor(private observer: BreakpointObserver, public loginService : LoginService,
    public blogService: BlogService) {}
  ngOnInit(): void {

    this.blogService.countBlog().subscribe((data)=>this.countBlog=data);
    
    

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


  // logout functionality

  logout(){
   this.loginService.logout();
   window.location.reload();
  }

}
