import { Component, OnInit } from '@angular/core';
import { ProdcutAPIService } from '../prodcut-api.service';
import { Product } from 'src/INTERFACE/Product-infor';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productInfo: Product[] = [];
  errMessage: string = '';
  productName: string = '';
  searchContainerVisible: boolean = false;
  productArtist: string = '';


  constructor(private productService: ProdcutAPIService,  private cartservice:CartService) {}
  
  items = this.cartservice.getitems()

  ngOnInit(): void {
    this.initSearch();
    this.innitBAR();

    // this.productService.getProdcut().subscribe({
    //   next: (data: Product[]) => {
    //     this.productInfo = data;
    //   },
    //   error: (error: any) => {
    //     this.errMessage = error;
    //   }
    // });
  }

  searchProduct(): Subscription {
    return this.productService.getProduct(this.productName).subscribe({
      next: (data: Product[]) => {
        this.productInfo = data;
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      }
    });
  }
  searchProductA(): Subscription {
    return this.productService.getProductA(this.productArtist).subscribe({
      next: (data: Product[]) => {
        this.productInfo = data;
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      }
    });
  }


  initSearch(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    // search.addEventListener('mousedown', () => {
    //   if (searchContainer.style.display === 'none') {
    //     searchContainer.style.display = 'block';
    //   } else {
    //     searchContainer.style.display = 'none';
    //   }
    // });
    // search.addEventListener('blur', () => {
    //   searchContainer.style.display = 'none';
    // });

    searchInput.addEventListener('input', () => {
      this.handleInputChange();
    });
  }
  innitBAR():void {
    const BAR = document.getElementById('BAR') as HTMLElement;
    const X = document.getElementById('Exitbutton') as HTMLElement;
    const responsiveMenu = document.getElementById('RSM') as HTMLElement ;
    BAR.addEventListener('click',() => {
      if (responsiveMenu.style.display === 'none') {
        responsiveMenu.style.display = 'block';
      } else {
        responsiveMenu.style.display = 'none';
      }
    });
    X.addEventListener('click',() => {
      if (responsiveMenu.style.display === 'block') {
        responsiveMenu.style.display = 'none';
      } else {
        responsiveMenu.style.display = 'block';
      }
    })

  }

  handleInputChange(): void {
    const searchContainer = document.getElementById('search-container') as HTMLElement;
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const inputValue = searchInput.value.trim().toLowerCase();

    if (inputValue.length > 0) {
      searchContainer.style.display = 'block';
    } else {
      searchContainer.style.display = 'none';
    }
  }

}
