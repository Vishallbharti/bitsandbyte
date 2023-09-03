import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../service/course.service';
import { NoticeService } from '../service/notice.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NgbCarouselConfig] 
  
})
export class HomepageComponent implements OnInit {
  
  noticeList:any;
  courseList:any;

  

  

  constructor(private noticeService: NoticeService,private router: Router,private courseService: CourseService) {
   

  }
  ngOnInit(): void {
 
    this.noticeService.getAllNotice().subscribe((data)=>this.noticeList=data);
    this.courseService.getAllCourse().subscribe((data)=>this.courseList=data);
   
  }

  

}
