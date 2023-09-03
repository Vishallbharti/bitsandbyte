
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminMessageComponent } from './admin-message/admin-message.component';
import { AdminUploadMaterialComponent } from './admin-upload-material/admin-upload-material.component';
import { AdminViewCourseComponent } from './admin-view-course/admin-view-course.component';

import { BlogComponent } from './blog/blog.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HomeCourseComponent } from './home-course/home-course.component';


import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomepageContactComponent } from './homepage-contact/homepage-contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { PendingBlogComponent } from './pending-blog/pending-blog.component';
import { AdminGuard } from './service/admin.guard';
import { UserGuard } from './service/user.guard';
import { StudentBlogComponent } from './student-blog/student-blog.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentMaterialComponent } from './student-material/student-material.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UserBlogComponent } from './user-blog/user-blog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserPendingBlogComponent } from './user-pending-blog/user-pending-blog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { AdminUpdateStudentComponent } from './admin-update-student/admin-update-student.component';
import { AdminViewStudentComponent } from './admin-view-student/admin-view-student.component';
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



const routes: Routes = [
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  {path:'homepage',component:HomepageComponent},
  {path:'homeContact',component:HomepageContactComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'login',component:LoginComponent},
  {path:'homeCourse',component:HomeCourseComponent},
  {path:'viewBlog/:id',component:ViewBlogComponent},
  {path:'homeViewCourse/:id',component:HomeViewCourseComponent},
  {path:'forgotUserPassword',component:ForgotUserPasswordComponent},
  {path:'updateUserPassword',component:UpdateUserPasswordComponent},
  {path:'forgotStudentPassword',component:ForgotStudentPasswordComponent},
  {path:'updateStudentPassword',component:UpdateStudentPasswordComponent},



  {path:'userLogin',component:UserLoginComponent},
  {path:'adminDashboard',component:AdminDashboardComponent, canActivate:[AdminGuard]},
  {path:'addStudent',component:AddStudentComponent},
  {path:'studentDetails',component:StudentDetailsComponent},
  {path:'blog',component:BlogComponent},
  {path: 'updateStudent',component:UpdateStudentComponent},
  {path: 'pendingBlog',component:PendingBlogComponent},
  {path: 'userSignUp',component:UserRegistrationComponent},
  {path:'addMaterial', component:AddMaterialComponent},
  {path:'adminMessage',component:AdminMessageComponent},
  {path:'contactForm',component:ContactFormComponent},
  {path:'addNotice',component:AddNoticeComponent},
  {path:'addCourse',component:AddCourseComponent},
  {path:'adminViewCourse',component:AdminViewCourseComponent},
  {path:'adminUploadMaterial/:id',component:AdminUploadMaterialComponent},
  {path:'adminBlog',component:AdminBlogComponent},
  {path:'updateStudent/:id',component:AdminUpdateStudentComponent},
  {path:'viewStudent/:id',component:AdminViewStudentComponent},
  {path:'adminViewBlog/:id',component:AdminViewBlogComponent},
  {path:'adminViewCourseDetail/:id',component:AdminViewCourseDetailComponent},
  {path:'adminStudyInIndia',component:AdminStudyInIndiaComponent},





  // Student Panel
  {path:'userDashboard',component:UserDashboardComponent, canActivate:[UserGuard]},
  {path:'userProfile',component:UserProfileComponent},
  {path:'message',component:MessageComponent},
   {path:'studentProfile',component:StudentProfileComponent},
  {path:'message',component:MessageComponent},
  {path:'studentMaterial',component:StudentMaterialComponent},
  {path:'studentBlog',component:StudentBlogComponent},
  {path:'studentLogin',component:StudentLoginComponent},
  {path:'studentViewBlog/:id',component:StudentViewBlogComponent},
  {path:'studentViewCourse/:id',component:StudentViewCourseComponent},
  {path:'studentMaterialView/:id',component:StudentMaterialViewComponent},
  {path:'studentStudyInIndia',component:StudentStudyInIndiaComponent},



//User Panel

  {path:'userBlog',component:UserBlogComponent},
  {path:'userPendingBlog',component:UserPendingBlogComponent},
  {path:'userDashboard',component:UserDashboardComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'createBlog',component:CreateBlogComponent},
  {path:'userCourses',component:UserCoursesComponent},
  {path:'userViewCourse/:id',component:UserViewCoursesComponent},
  {path:'userViewBlog/:id',component:UserViewBlogComponent},
  {path:'userViewPendingBlog/:id',component:UserViewPendingBlogComponent},

  // Student Panel
 
  {path:'studentDashboard',component:StudentDashboardComponent},
  {path:'studentProfile',component:StudentProfileComponent},
  {path:'message',component:MessageComponent},
  {path:'studentMaterial',component:StudentMaterialComponent},
  {path:'studentBlog',component:StudentBlogComponent},
  {path:'studentCourse',component:StudentCourseComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
