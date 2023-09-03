import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-admin-view-blog',
  templateUrl: './admin-view-blog.component.html',
  styleUrls: ['./admin-view-blog.component.css']
})
export class AdminViewBlogComponent implements OnInit {
  id:any;

  blogList:any;

  constructor(private route: ActivatedRoute,private blogService: BlogService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.blogService.getBlogById(this.id).subscribe((data)=> this.blogList=data);
  }


}
