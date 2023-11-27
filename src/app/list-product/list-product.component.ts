import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListProducthttpService } from './list-producthttp.service';
import { IProduct } from './i-list-product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']  
})
export class ListProductComponent implements OnInit {
    products: IProduct[] = [];
    startIndex = 0;
    pageSize = 20;
    increment = 20;
    listcategory=['CD', 'Vinyl', 'Cassette'];
    errMessage: string = '';

    constructor(private productService: ListProducthttpService, private activedRoute: ActivatedRoute) {}

    ngOnInit(): void {
      this.loadProducts();
    }
  
    loadProducts() {
      this.productService.getProducts().subscribe(
        products => {this.products = products},
        (err: any) => {
          this.errMessage = err;}
      )
    }

    loadMore() {
      this.startIndex += this.increment;
      this.loadProducts();
    }

    selectedCategory: string | null = null;

    selectCategory(category: string):void {
      this.selectedCategory = category;
    }

    clearFilter(): void {
      this.selectedCategory = null;
    };

    searchText:any
  
}
