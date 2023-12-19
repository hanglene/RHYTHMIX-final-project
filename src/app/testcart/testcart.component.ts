import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ProdcutAPIService } from '../prodcut-api.service';
import { Product } from 'src/INTERFACE/Product-infor';
@Component({
  selector: 'app-testcart',
  templateUrl: './testcart.component.html',
  styleUrls: ['./testcart.component.css']
})
export class TestcartComponent {
  products:any;
  errMessage:string=''
  constructor( private addtocartservice: CartService, private product:ProdcutAPIService){
  this.product.getProdcut().subscribe({
  next:(data)=>{this.products=data},
  error:(err)=>{this.errMessage=err}
  })
  }


  addtoCart(product: Product) {
    this.addtocartservice.addtoCart(product);
    console.log(this.addtocartservice.getitems());
    alert('Đã thêm vào giỏ hàng')
  }
}
