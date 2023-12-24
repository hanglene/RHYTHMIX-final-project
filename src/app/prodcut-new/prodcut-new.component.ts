import { Component } from '@angular/core';
import { Product } from '../INTERFACE/Product';
import { ProductAdminService } from '../product-admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prodcut-new',
  templateUrl: './prodcut-new.component.html',
  styleUrl: './prodcut-new.component.css'
})
export class ProdcutNewComponent {
  product = new Product();
  products:any;
  errMessage: string = '';
  selectedProduct: Product | undefined;

  constructor(private _service: ProductAdminService , private router:Router) {
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
  onFileSelected2(event: any,  product: Product) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.Image_2 = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  postProduct() {
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        this.product = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product has been posted successfully!',
        });
      },
      error: (err) => {
        this.errMessage = err;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to post product',
        });
      },
    });
  };
  
}
