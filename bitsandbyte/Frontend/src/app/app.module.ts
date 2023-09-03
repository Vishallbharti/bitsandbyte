import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddStudentComponent } from './add-student/add-student.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFileUploadModule } from 'mat-file-upload';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { BlogComponent } from './blog/blog.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { PendingBlogComponent } from './pending-blog/pending-blog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessageComponent } from './message/message.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { UserPendingBlogComponent } from './user-pending-blog/user-pending-blog.component';
import { StudentMaterialComponent } from './student-material/student-material.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentBlogComponent } from './student-blog/student-blog.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AddNoticeComponent } from './add-notice/add-notice.component';  
import { EditorModule } from '@tinymce/tinymce-angular';
import { FooterComponent } from './footer/footer.component';
import { HomepageContactComponent } from './homepage-contact/homepage-contact.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AdminViewCourseComponent } from './admin-view-course/admin-view-course.component';
import { AdminUploadMaterialComponent } from './admin-upload-material/admin-upload-material.component';    
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { LoginComponent } from './login/login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeCourseComponent } from './home-course/home-course.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { AdminUpdateStudentComponent } from './admin-update-student/admin-update-student.component';
import { AdminViewStudentComponent } from './admin-view-student/admin-view-student.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { AdminViewBlogComponent } from './admin-view-blog/admin-view-blog.component';
import { StudentViewBlogComponent } from './student-view-blog/student-view-blog.component';
import { StudentViewCourseComponent } from './student-view-course/student-view-course.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { UserViewCoursesComponent } from './user-view-courses/user-view-courses.component';
import { UserViewBlogComponent } from './user-view-blog/user-view-blog.component';
import { HomeViewCourseComponent } from './home-view-course/home-view-course.component';
import { UserViewPendingBlogComponent } from './user-view-pending-blog/user-view-pending-blog.component';
import { AdminViewCourseDetailComponent } from './admin-view-course-detail/admin-view-course-detail.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { ForgotUserPasswordComponent } from './forgot-user-password/forgot-user-password.component';
import { ForgotStudentPasswordComponent } from './forgot-student-password/forgot-student-password.component';
import { UpdateStudentPasswordComponent } from './update-student-password/update-student-password.component';
import { StudentStudyInIndiaComponent } from './student-study-in-india/student-study-in-india.component';
import { AdminStudyInIndiaComponent } from './admin-study-in-india/admin-study-in-india.component';
import { StudentMaterialViewComponent } from './student-material-view/student-material-view.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeNavbarComponent,
    HomepageComponent,

    AboutUsComponent,
    UserLoginComponent,
   


    // Admin Component
    AdminDashboardComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    BlogComponent,
    UpdateStudentComponent,
    PendingBlogComponent,
    AddNoticeComponent,
    ContactFormComponent,
    AddMaterialComponent,
    AdminMessageComponent,
    AdminBlogComponent,


    // Student Component
    StudentMaterialComponent,
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentBlogComponent,
    MessageComponent,


    // User Component
    UserDashboardComponent,
    UserProfileComponent,
    MessageComponent,
    UserRegistrationComponent,
    CreateBlogComponent,
    UserPendingBlogComponent,
    UserBlogComponent,
    FooterComponent,
    HomepageContactComponent,
    AddCourseComponent,
    AdminViewCourseComponent,
    AdminUploadMaterialComponent,
    LoginComponent,
    StudentLoginComponent,
    HomeCourseComponent,
    StudentCourseComponent,
    AdminUpdateStudentComponent,
    AdminViewStudentComponent,
    ViewBlogComponent,
    AdminViewBlogComponent,
    StudentViewBlogComponent,
    StudentViewCourseComponent,
    UserCoursesComponent,
    UserViewCoursesComponent,
    UserViewBlogComponent,
    HomeViewCourseComponent,
    UserViewPendingBlogComponent,
    AdminViewCourseDetailComponent,
    UpdateUserPasswordComponent,
    ForgotUserPasswordComponent,
    ForgotStudentPasswordComponent,
    UpdateStudentPasswordComponent,
    StudentStudyInIndiaComponent,
    AdminStudyInIndiaComponent,
    StudentMaterialViewComponent

    // search
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    EditorModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    

    
 
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
