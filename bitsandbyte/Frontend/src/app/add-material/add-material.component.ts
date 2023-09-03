import { BreakpointObserver } from '@angular/cdk/layout';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Message } from '../model/Message';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  courseList: any;
  @Input()
  public searchText = "";

  constructor(private observer: BreakpointObserver, private courseService: CourseService,
    private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe((data) => this.courseList = data);
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

  upload(id: any) {
    this.router.navigate(['/adminUploadMaterial', id]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }

}
