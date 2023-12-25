import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ord-complete-page',
  templateUrl: './ord-complete-page.component.html',
  styleUrls: ['./ord-complete-page.component.css']
})
export class OrdCompletePageComponent {
  customerInfo: any;  // Add this line to declare customerInfo property

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.titleService.setTitle("Order completed - Rhythmix");

    this.route.params.subscribe(params => {
      if (params['CustomerName']) {
        this.showCustomerInfo(params);
      }
    });
  }

  showCustomerInfo(customerInfo: any): void {
    this.customerInfo = customerInfo;
  }
}