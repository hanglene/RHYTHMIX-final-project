import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
constructor ( private cartservice:CartService){}
items = this.cartservice.getitems();
getFormattedTotalPrice(item: any): string {
  const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ''), 10);
  const totalPrice = item.amount * unitPrice;
  return totalPrice.toLocaleString('fr') + ' VND';
}
tongtien() {
  let tt: number = 0;
  this.items.forEach(item => {
    const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ""), 10);
    const totalPrice = item.amount * unitPrice;
    tt += totalPrice
  }, 0);
  const formattedTotal = tt.toLocaleString('fr', { useGrouping: true });
  return formattedTotal + ' VND'
}
tongsoluong(){
  let tsl: number=0;
  this.items.forEach(item => tsl +=item.amount);
  return tsl;
}
removeItem(item: any): void {
  
  // Gọi phương thức removeItem() từ service của bạn để xóa mục
  this.cartservice.removeItem(item);
}

increaseQuantity(item: Cart): void {
  item.amount++;
}

decreaseQuantity(item: Cart): void {
  if (item.amount > 1) {
    item.amount--;
  }
}

clearCart(): void {
  this.cartservice.clearcart();
  location.reload()
}

}
