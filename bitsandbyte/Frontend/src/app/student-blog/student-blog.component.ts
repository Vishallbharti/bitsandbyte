import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-blog',
  templateUrl: './student-blog.component.html',
  styleUrls: ['./student-blog.component.css']
})
export class StudentBlogComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  blogList: any;
  @Input()
public searchText = "";
studentList:any;


  constructor(private observer: BreakpointObserver, private blogService: BlogService,
    private router: Router, private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.blogService.getAllBlog().subscribe((data) => this.blogList = data);
    this.studentService.getStudentByStudentSr(<string>localStorage.getItem("studentsr")).subscribe((data)=>this.studentList=data);
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

  viewBlog(id: any) {
    this.router.navigate(['/studentViewBlog', id]);
  }

  logout() {
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }

}
