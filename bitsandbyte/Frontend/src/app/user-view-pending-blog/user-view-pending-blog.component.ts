import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-view-pending-blog',
  templateUrl: './user-view-pending-blog.component.html',
  styleUrls: ['./user-view-pending-blog.component.css']
})
export class UserViewPendingBlogComponent implements OnInit {

  blogList: any;
  currentUser: any;
  id: any;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private blogService: BlogService
    , private loginService: LoginService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe(data => this.blogList = data);

    this.blogService.getBlogById(this.id).subscribe(data => console.log(data));
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

  logout(){
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
