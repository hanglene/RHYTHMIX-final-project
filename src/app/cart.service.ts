import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartChanged = new Subject<void>();
  private storageKey = 'cartItems';
  items: Cart[] = [];

  constructor(private h: HttpClient) {
    // Khôi phục dữ liệu từ Local Storage khi khởi tạo CartService
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  addtoCart(sp: Product) {
    const index = this.items.findIndex(item => item._id === sp._id);
    if (index >= 0) {
      this.items[index].amount++;
    } else {
      const c: Cart = {
        _id: sp._id,
        Artist: sp.Artist,
        Name: sp.Name,
        UnitPrice: sp.UnitPrice,
        category: sp.category,
        Image: sp.Image,
        amount: 1
      };
      this.items.push(c);
    }

    this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi cập nhật giỏ hàng
  }

  getitems() {
    return this.items;
  }

  removeItem(item: Cart): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi xóa một mục
      this.cartChanged.next();
    }
  }

  clearcart() {
    this.items = [];
    this.saveItemsToLocalStorage(); // Lưu trữ dữ liệu vào Local Storage sau khi xóa tất cả các mục
    return this.items;
    this.cartChanged.next();
    
  }

  getCartChanged(): Subject<void> {
    return this.cartChanged;
  }

  private saveItemsToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}