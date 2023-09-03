import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-view-blog',
  templateUrl: './user-view-blog.component.html',
  styleUrls: ['./user-view-blog.component.css']
})
export class UserViewBlogComponent implements OnInit {

  user: any;
  id: any;
  blogList: any;

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute,
    private loginService: LoginService, private blogService: BlogService, private router: Router) { }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe(data => this.blogList = data);
    this.user = this.loginService.getUser();
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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
