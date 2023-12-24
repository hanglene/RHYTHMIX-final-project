import { Component } from '@angular/core';
import { Product } from '../INTERFACE/Product';
import { ProductAdminService } from '../product-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent {
  products: any;
  product =  new  Product();
  errMessage: string = '';
  constructor(private _service: ProductAdminService, private activateRoute: ActivatedRoute, private router:Router) {
    this.activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchProduct(id);
      }
    });
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

public setProduct(p: Product){
  this.product = p
}


putProduct() {
  this._service.putProduct(this.product).subscribe({
    next: (data) => {
      this.products = data;
      Swal.fire({
        title: 'Success',
        text: 'Product updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    error: (err) => {
      this.errMessage = err;
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating the product',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });
  console.log(this.product);
}

searchProduct(_id: string) {
  this._service.getProductI(_id).subscribe({
    next: (data) => {this.product = data},
    error: (err) => {this.errMessage = err}
  })
}

}
