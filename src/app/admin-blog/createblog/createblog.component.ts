import { Component } from '@angular/core';
import { Blog } from '../../INTERFACE/blog';
import { AdminblogService } from '../../adminblog.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrl: './createblog.component.css'
})
export class CreateblogComponent {

  blog = new Blog();
  errMessage: string = '';
  
  constructor(private _service: AdminblogService, private router:Router,) {
  }
  public setFashion(b: Blog) {
    this.blog = b;
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

  postBlog() {
    this._service.postFashion(this.blog).subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.router.navigate(['adminBlog'])
  }



}
