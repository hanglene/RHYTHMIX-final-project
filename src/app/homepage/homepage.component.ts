import { Component, OnInit } from '@angular/core';
import { TredingPhhtpService } from '../treding-phhtp.service';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products: any;
  productcart: Product[]=[];
  // Danh sách sản phẩm trong giỏ hàng

  //set title of page
  constructor(private _service: TredingPhhtpService, private titleService: Title, private addtocartservice:CartService) {
    this.titleService.setTitle("Homepage - Rhythmix"); 
    this._service.getProduct().pipe(
      map((data: any[]) => {
        return data.map((item: any) => {
          const price = parseFloat(item.Price.replace('Đ', '').trim());
          const promotion = parseFloat(item.Promotion.replace('%', '').trim()) / 100;
          const currentPrice = price - price * promotion;
          const formattedCurrentPrice = currentPrice.toFixed(3).replace('.', ',');
          return {
            ...item,
            CurrentPrice: formattedCurrentPrice
          };
        });
      })
    ).subscribe({
      next: (data: any[]) => {
        this.products = data;
      }
    });
  }
  
  initSlider(): void {
    const DSA = document.querySelector(".slide .dsa") as HTMLElement;
    const slideButtons = document.querySelectorAll(".slide .slidebutton") as NodeListOf<HTMLElement>;
    const DSS = document.querySelector(".slide1 .dsb") as HTMLElement;
    const slideButtons1 = document.querySelectorAll(".slide1 .slidebutton") as NodeListOf<HTMLElement>;
    const DSN = document.querySelector(".slide2 .dsn") as HTMLElement;
    const slideButtons2 = document.querySelectorAll(".slide2 .slidebutton") as NodeListOf<HTMLElement>;
    

    if (DSA) {
      const maxScrollLeftDSA = DSA.scrollWidth - DSA.clientWidth;
  
      slideButtons.forEach(button => {
        button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = DSA.clientWidth * direction;
          DSA.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
      });
  
      const handleSlideButtonsDSA = () => {
        slideButtons[0].style.display = DSA.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = DSA.scrollLeft >= maxScrollLeftDSA ? "none" : "block";
      };
  
      DSA.addEventListener("scroll", handleSlideButtonsDSA);
    }
  
    if (DSS) {
      const maxScrollLeftDSS = DSS.scrollWidth - DSS.clientWidth;
  
      slideButtons1.forEach(button => {
        button.addEventListener("click", () => {  
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = DSS.clientWidth * direction;
          DSS.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
      });
  
      const handleSlideButtonsDSS = () => {
        slideButtons1[0].style.display = DSS.scrollLeft <= 0 ? "none" : "block";
        slideButtons1[1].style.display = DSS.scrollLeft >= maxScrollLeftDSS ? "none" : "block";
      };
  
      DSS.addEventListener("scroll", handleSlideButtonsDSS);
    }
    if (DSN) {
      const maxScrollLeftDSN = DSN.scrollWidth - DSN.clientWidth;
  
      slideButtons2.forEach(button => {
        button.addEventListener("click", () => {  
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = DSN.clientWidth * direction;
          DSN.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
      });
  
      const handleSlideButtonsDSN = () => {
        slideButtons2[0].style.display = DSN.scrollLeft <= 0 ? "none" : "block";
        slideButtons2[1].style.display = DSN.scrollLeft >= maxScrollLeftDSN ? "none" : "block";
      };
  
      DSN.addEventListener("scroll", handleSlideButtonsDSN);
    }
  }


  
  
 
  ngOnInit(): void {
  
    window.addEventListener("load", this.initSlider.bind(this));
    window.addEventListener("load", () => {
      this.initSlider();

    });
    
  }
  addtoCart(product: Product) {
    this.addtocartservice.addtoCart(product);
    console.log(this.addtocartservice.getitems());
    alert('Đã thêm vào giỏ hàng')
  }
}