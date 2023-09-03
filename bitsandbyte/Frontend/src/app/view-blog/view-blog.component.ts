import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../model/Blog';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  id:any;
  blogList:any;
  constructor(private route: ActivatedRoute,private blogService: BlogService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blogService.getBlogById(this.id).subscribe((data)=> this.blogList=data);
  }
}
