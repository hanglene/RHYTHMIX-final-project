import { Component } from '@angular/core';
import { AdminblogService } from '../../adminblog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminblog',
  templateUrl: './adminblog.component.html',
  styleUrl: './adminblog.component.css'
})
export class AdminblogComponent {
  blogs: any;
errMessage: string = '';
constructor(public _service: AdminblogService, public router: Router) {
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
