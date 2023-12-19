import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent {
  //set title of page
  public constructor(private titleService: Title){
    this.titleService.setTitle("Tlinh - 'love' album (Standard Ver.) - Rhythmix"); 
  }


  quantity: number = 1;
  initialQuantity: number = 1;
  mainImage= "../../assets/anhalbum/tlinh-ai-album-standard_afbf68f2a8de4d70862490a725431ec6_master.webp";
  image1 = "../../assets/anhalbum/tlinh-ai-jewel-case_b6871f8c6179429da96f24a1328ae819.webp";
  image2 = "../../assets/anhalbum/1_7ab514a9f6a34536890cc20fe7aa4327_master.webp";
  image3 = "../../assets/anhalbum/tlinh-ai-album-standard_afbf68f2a8de4d70862490a725431ec6_master.webp";
  mainImageSrc: string = 'path_to_main_image.jpg';
  magnifierVisible: boolean = false;
  magnifierX: number = 0;
  magnifierY: number = 0;

  onIncreaseQuantity() {
    if (this.quantity < 100) {
      this.quantity++;
    }
  }

  onDecreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onQuantityChange(event: Event) {
    const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  resetQuantity() {
    this.quantity = this.initialQuantity;
  }
  changeMainImage(imageSrc: string) {
    const mainImage = document.getElementById("productinfo_anhchinhablbum");
  
    if (mainImage instanceof HTMLElement) {
      const imageElement = mainImage.getElementsByTagName("img")[0];
      if (imageElement) {
        imageElement.src = imageSrc;
      }
    }
  }
  // showMagnifier(visible: boolean) {
    // this.magnifierVisible = visible;
  // }

  // updateMagnifier(event: MouseEvent) {
    // this.magnifierX = event.clientX;
    // this.magnifierY = event.clientY;
  // }
}
