import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Student } from '../model/Student';
import { CourseMaterialService } from '../service/course-material.service';
import { CourseService } from '../service/course.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-material-view',
  templateUrl: './student-material-view.component.html',
  styleUrls: ['./student-material-view.component.css']
})
export class StudentMaterialViewComponent implements OnInit {

  studentList:Student= new Student();
  id:any;
  material:any;
  course:any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(private observer: BreakpointObserver,private router:Router, private route:ActivatedRoute,
    private studentService:StudentService,private courseService:CourseService
    ,private courseMaterialService: CourseMaterialService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);


    this.courseService.getCourseById(this.id).subscribe((data) => this.course = data);
    this.courseService.getMaterialByCourseId(this.id).subscribe((data) => this.material = data);


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


  download(id: number) {
    this.courseMaterialService.downloadCourseMaterial(id).subscribe((data) => {

      let fileName = data.headers.get('content-disposition')?.split(';')[1].split('=')[1] || '';
      console.log("file name: " + fileName);
      let blob: Blob = data.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    }, err => {
      console.log(err);

    })
  }


  logout(){
  
    this.studentService.logout();
    this.router.navigate(['/studentLogin']);

    
  }


}
