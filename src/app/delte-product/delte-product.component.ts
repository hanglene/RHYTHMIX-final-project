import { Component } from '@angular/core';
import { Product } from '../INTERFACE/Product';
import { ProductAdminService } from '../product-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delte-product',
  templateUrl: './delte-product.component.html',
  styleUrl: './delte-product.component.css'
})
export class DelteProductComponent {
  products:any;
  errMessage: string = '';

  constructor(private _service: ProductAdminService , private router:Router) {
    this._service.getProdcut().subscribe({
      next:(data)=>{this.products=data},
      error:(err)=>{this.errMessage=err}
      })
  }
  deleteProduct(_id:any){
    if (window.confirm('confirm to delete?')){
      this._service.deleteProduct(_id).subscribe({
        next:(data)=>{this.products=data},
        error:(err)=>{this.errMessage=err}
      })
    }
  }
}

