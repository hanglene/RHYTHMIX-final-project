import { Component, ElementRef, OnInit, inject} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../cart.service';
import { Cart } from '../../INTERFACE/cart';
import { ProdcutAPIService } from '../prodcut-api.service';
import { Product } from 'src/INTERFACE/Product-infor';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { PaymentInfo, discountInfo } from 'src/INTERFACE/Payment';
import { PaymentServiceService } from '../payment-service.service';
import { Router } from '@angular/router';




interface DateSelection {
  month: string;
  year: string;
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  public dateSelection: DateSelection = { month: '', year: '' };
  public months: { value: string; label: string }[] = [];
  public years: string[] = [];
  


  showCODInfo: boolean = false;
  showBankingInfo: boolean = false;
  errMessage: any;
  router: any;

  toggleCODInfo(): void {
    this.showCODInfo = true;
    this.showBankingInfo = false;
  }

  toggleBankingInfo(): void {
    this.showBankingInfo = true;
    this.showCODInfo = false;
  }
  


  initPayment(): void {
  
    const PM = document.getElementById('PM') as HTMLButtonElement;
    const PaymentInfo = document.getElementById('PaymentInfo') as HTMLFormElement;
    const CustomerInfo = document.getElementById('CustomerInfo') as HTMLFormElement;
  
    PM.addEventListener('click', () => {
      if (PaymentInfo.classList.contains('hidden')) {
        PaymentInfo.classList.remove('hidden');
        CustomerInfo.classList.add('hidden');
      } else {
        PaymentInfo.classList.add('hidden');
        CustomerInfo.classList.remove('hidden');
      }
    });
    }

  private populateMonths(): void {
    for (let i = 1; i <= 12; i++) {
      const month = {
        value: i.toString().padStart(2, '0'),
        label: new Date(0, i - 1).toLocaleString('default', { month: 'short' })
      };
      this.months.push(month);
    }
  }

  private populateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const endYear = 2300;

    for (let i = startYear; i <= endYear; i++) {
      this.years.push(i.toString());
    }
  }

  public handleDateChange(): void {
    console.log(this.dateSelection);
  }
  paymentinfo = new PaymentInfo();
  paymentinfos:any;
  discountInfo : any;
  discountinfo = new discountInfo()
  products: any;
  //set title of page
  constructor(
    private _service:  ProdcutAPIService, 
    private titleService: Title,  
    private cartservice:CartService, 
    private paymentservice:PaymentServiceService,
    private routerr: Router) {
    this.titleService.setTitle("Payment - Rhythmix"); 
    this._service.getProdcut().subscribe((data: Product[]) => {
      this.products = data;
      this.populateMonths();
      this.populateYears();
    });

    this.paymentservice.getPayment().subscribe({
      next:(data)=>{this.paymentinfos=data},
      error:(err)=>{this.errMessage=err}
      });

    this.paymentservice.getDiscount().subscribe({
        next:(data)=>{this.discountInfo=data},
        error:(err)=>{this.errMessage=err}
        });
        

  }

  public setDiscount(f: discountInfo) {
    this.discountinfo = f;
  }
  
  putDiscount() {
    this.paymentservice.putDiscount(this.discountInfo).subscribe({
      next: (data: any) => {
        this.discountInfo=data
      },
      error: (err: any) => {
        this.errMessage=err
      }
    });
  }
  public setPayment(f: PaymentInfo) {
    this.paymentinfo = f;
  }
  postPayment() {
    this.paymentservice.postPayment(this.paymentinfo).subscribe({
      next: (data) => {
        this.paymentinfo = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    this.router.navigate(['Payment'])
  };

  radioChange (event:any, paymentinfo: PaymentInfo ) {
    const COD = document.getElementById('COD') as HTMLInputElement;
    if (COD.checked) {
      paymentinfo.Payment_Method  =   event.target.value;
    }
    else {   
      paymentinfo.Payment_Method  =   event.target.value;
    }
  }
  checkChange (event:any, paymentinfo: PaymentInfo ) {
    const check = document.getElementById('Delivery') as HTMLInputElement;
    if (check.checked) {
      paymentinfo.Shipping_Method  =   event.target.value;
    }
    else {   
    }
  }
  


  items = this.cartservice.getitems();
  discounts = this.paymentservice.getDiscount();


getFormattedTotalPrice(item: any): string {
  const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ''), 10);
  const totalPrice = item.amount * unitPrice;
  return totalPrice.toLocaleString('fr') + ' VND';
};
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

tongtien1() {
  let tt: number = 0;
  this.items.forEach(item => {
    const unitPrice = parseInt(item.UnitPrice.replace(/\D/g, ""), 10);
    const totalPrice = item.amount * unitPrice;
    tt += totalPrice
  }, 0);
  const formattedTotal = tt.toLocaleString('fr', { useGrouping: true });
  return formattedTotal + ' VND';
}
increaseQuantity(item: Cart): void {
  item.amount++;
}

decreaseQuantity(item: Cart): void {
  if (item.amount > 1) {
    item.amount--;
  }
}
fb = inject(FormBuilder);

CustomerInfoForm !: FormGroup;
PaymentInfoForm !: FormGroup;

  ngOnInit() {
    this.CustomerInfoForm  = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      DeliverAddress: ['', Validators.required],
      CustomerName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
    });
    this.PaymentInfoForm  = this.fb.group({
      ShippingMethod: ['', Validators.required],
      
    });


    this.initPayment();
}

CustomerForm(){
  console.log(this.CustomerInfoForm.value)
}
navigateToOrderCompletePage(): void {
  this.routerr.navigate(['ord-complete-page', this.paymentservice.customerInfo]);
}
}

