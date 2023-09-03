import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-home-course',
  templateUrl: './home-course.component.html',
  styleUrls: ['./home-course.component.css']
})
export class HomeCourseComponent implements OnInit {

  @Input()
  public searchText = "";
  courseList:any;
  constructor(private courseService: CourseService,private router : Router) { }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe((data)=>this.courseList=data);
  }



  viewCourse(id:any){
    console.log(id);
    this.router.navigate(['/homeViewCourse',id]);
  }
}
