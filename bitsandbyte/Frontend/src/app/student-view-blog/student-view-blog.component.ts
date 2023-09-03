import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BlogService } from '../service/blog.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-view-blog',
  templateUrl: './student-view-blog.component.html',
  styleUrls: ['./student-view-blog.component.css']
})
export class StudentViewBlogComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  id: any;
  blogList: any;
  studentList:any;
  

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute,
    private blogService: BlogService,private studentService: StudentService,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe(data => this.blogList = data);
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

  logout(){
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);
  }

}
