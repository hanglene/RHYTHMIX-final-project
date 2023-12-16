import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-testcart',
  templateUrl: './testcart.component.html',
  styleUrls: ['./testcart.component.css']
})
export class TestcartComponent {



  products:any;
  errMessage:string=''
  constructor( private addtocartservice: CartService, private product:ProductService){
  this.product.getProducts().subscribe({
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
