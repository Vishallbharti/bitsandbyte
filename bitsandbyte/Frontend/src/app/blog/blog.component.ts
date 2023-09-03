import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  blogList: any;
  id: any;

  @Input()
  public searchText = "";


  constructor(private observer: BreakpointObserver, private blogService: BlogService
    , private userService: UserService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.blogService.getAllBlog().subscribe((data) => this.blogList = data);
    this.blogService.getAllBlog().subscribe((data) => console.log(data));
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

  view(id: any) {
    console.log(id);
    this.router.navigate(['/viewBlog', id]);


  }


}
