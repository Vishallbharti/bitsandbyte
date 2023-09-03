import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-home-view-course',
  templateUrl: './home-view-course.component.html',
  styleUrls: ['./home-view-course.component.css']
})
export class HomeViewCourseComponent implements OnInit {


  id:any;
  courseList: Course = new Course();

  constructor(private route: ActivatedRoute, private courseService:CourseService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
 
    this.courseService.getCourseById(this.id).subscribe(data=>this.courseList=data);
    this.courseService.getCourseById(this.id).subscribe(data=>console.log(data));

   

  }

}
