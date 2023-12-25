import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
blogs: any;
errMessage: string = '';
constructor(public _service: BlogService, public router: Router) {
  this._service.getBlogs().subscribe({
    next: (data) => {
      this.blogs = data;
    },
    error: (err) => {
      this.errMessage = err;
    },
  });
}


updateBlog(B:any){
  this.router.navigate(['Update', B._id])
}
createBlog(){
  this.router.navigate(['CreateBlog'])
}
deleteBlog(_id:any){
  if (window.confirm('confirm to delete?')){
    this._service.deleteBlog(_id).subscribe({
      next:(data)=>{this.blogs=data},
      error:(err)=>{this.errMessage=err}
    })
    location.reload()
  }
}
}
