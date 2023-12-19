import { Component } from '@angular/core';
import { Product } from 'src/INTERFACE/Product-infor';
import { ProdcutAPIService } from '../prodcut-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-new',
  templateUrl: './admin-create-new.component.html',
  styleUrls: ['./admin-create-new.component.css']
})
export class AdminCreateNewComponent {
  product = new Product();
  products:any;
  errMessage: string = '';
  constructor(private _service: ProdcutAPIService , private router:Router) {
    this._service.getProdcut().subscribe({
      next:(data)=>{this.products=data},
      error:(err)=>{this.errMessage=err}
      })
  }
  public setProduct(f: Product) {
    this.product = f;
  }
  onFileSelected(event: any, product: Product) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  onFileSelected1(event: any,  product: Product) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.Image_1 = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  postProduct() {
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.router.navigate(['adminFashion'])
  };
}
