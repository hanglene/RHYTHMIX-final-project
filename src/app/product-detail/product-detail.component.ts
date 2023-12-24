import { Component } from '@angular/core';
import { Product } from '../INTERFACE/Product';
import { ProductAdminService } from '../product-admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})


export class ProductDetailComponent {

  products: any;
  errMessage: any;
  constructor(private _service: ProductAdminService , private activateRoute: ActivatedRoute, private router:Router) 
  {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id  != null) {
        this.searchProduct(id)
      }
    })
  }

  searchProduct(product_id: string) {
    this._service.getProductI(product_id).subscribe({
      next: (data) => {this.products = data},
      error: (err) => {this.errMessage = err}
    })
  }
  
  
}
