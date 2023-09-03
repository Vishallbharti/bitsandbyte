import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Course } from '../model/Course';

import { CourseMaterial } from '../model/CourseMaterial';
import { CourseMaterialService } from '../service/course-material.service';
import { CourseService } from '../service/course.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-admin-upload-material',
  templateUrl: './admin-upload-material.component.html',
  styleUrls: ['./admin-upload-material.component.css']
})
export class AdminUploadMaterialComponent implements OnInit {


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  blogList: any;
  isError: boolean = false;
  errMessage: string = '';
  id: any;
  f:any;

  courseMaterial: CourseMaterial;
  selectedFile: any;
  blogError: any;
  material: any;
  course: any;
  public searchText = "";



  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private courseService: CourseService
    , private router: Router, private courseMaterialService: CourseMaterialService, private loginService: LoginService) {
    this.course = new Course();
    this.courseMaterial = new CourseMaterial();

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.courseService.getCourseById(this.id).subscribe((data => console.log(data)));
    this.courseService.getCourseById(this.id).subscribe((data) => this.course = data);
    this.courseService.getMaterialByCourseId(this.id).subscribe((data) => this.material = data);
    this.courseService.getMaterialByCourseId(this.id).subscribe((data) => console.log(data));


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


  // onFileSelected(event: any) {
  //   console.log("In select event function")
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.selectedFile = file;
  //     console.log(this.selectedFile);
  //   }
  // }

  onFileSelected(event: any) {
    console.log("In select event function")
   this.f= event.target.files[0].name;
    console.log(event.target.files[0].name);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      console.log(this.selectedFile);
    }
  }



  uploadMaterial() {
    console.log(this.courseMaterial);
    let that = this;
    console.log(this.id);

    this.courseMaterial.courseId = this.id;
    console.log(this.courseMaterial);

    const formData: FormData = new FormData();
    formData.append('content', this.selectedFile);
    formData.append('material', new Blob([JSON
      .stringify(this.courseMaterial)], {
      type: 'application/json'
    }));


    this.courseMaterialService.addMaterial(formData)
      .subscribe({
        next(data: any) {
          Swal.fire('Success', 'You have successfuly uploaded material!', 'success').then(function () {
            window.location.reload();
          });

        },
        error(data: { error: { description: string; }; }): any {
          that.blogError = true;
          that.errMessage = data.error.description;
          that.router.navigate(['/adminUploadMaterial']);
        }
      });


  }

  delete(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.courseMaterialService.deleteCourseMaterial(id).subscribe((data) => {

          this.router.navigate(['/adminUploadMaterial']);
        }, err => {
          console.log(err);
          this.router.navigate(['/adminUploadMaterial']);
        })

        Swal.fire(
          'Deleted!',
          'Course Material Deleted.',
          'success'
        ).then(function () {
          window.location.reload();
        });
      }
    })

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


  logout() {
    this.loginService.logout();
    this.router.navigate(['/userLogin']);
  }


}



