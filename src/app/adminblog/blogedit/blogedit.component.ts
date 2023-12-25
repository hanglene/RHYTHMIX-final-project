import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/blog.service';
import { Blog } from 'src/INTERFACE/blog';
@Component({
  selector: 'app-blogedit',
  templateUrl: './blogedit.component.html',
  styleUrls: ['./blogedit.component.css']
})
export class BlogeditComponent {
  Blog = new Blog();
  Blogs: any;
  errMessage: string = '';
  constructor(private _service: BlogService, private activateRoute: ActivatedRoute, private router:Router) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id != null) {
        this.searchBlog(id)
      }
    })
  }
  public setFashion(b:Blog){
    this.Blog=b
  }
  searchBlog(BlogId: string) {
    this._service.getABlog(BlogId).subscribe({
      next: (data) => {this.Blog = data},
      error: (err) => {this.errMessage = err}
    })
  }
 
  onFileSelected(event: any, blog: Blog) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      blog.anh1 = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  putBlog() {
    this._service.putBlog(this.Blog).subscribe({
      next: (data) => {
        this.Blogs = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
