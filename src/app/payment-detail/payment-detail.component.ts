import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentServiceService } from '../payment-service.service';
import { CartItem, PaymentInfo, PaymentItem } from '../INTERFACE/Payment'; // Adjust the file path accordingly
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent {

  payments: any;
  errMessage: any;
  constructor(private _service: PaymentServiceService , private activateRoute: ActivatedRoute, private router:Router) 
  {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id  != null) {
        this.searchProduct(id)
      }
    })

  }
  searchProduct(_id: string) {
    this._service.getPaymentByID(_id).subscribe({
      next: (data) => {this.payments = data},
      error: (err) => {this.errMessage = err}
    })
  }

  

  putPayment(): void {
    const paymentInfo = new PaymentInfo(
      this.payments._id,
      {
        paymentInfo: {
          _id: this.payments.items.paymentInfo._id,
          Customer_Name: this.payments.items.paymentInfo.Customer_Name,
          Deliver_Address: this.payments.items.paymentInfo.Deliver_Address,
          Phone_Number: this.payments.items.paymentInfo.Phone_Number,
          Email: this.payments.items.paymentInfo.Email,
          Payment_Method: this.payments.items.paymentInfo.Payment_Method,
          Shipping_Method: this.payments.items.paymentInfo.Shipping_Method,
          currentPrice: this.payments.items.paymentInfo.currentPrice,
        },
        cartInfo: {
          items: this.payments.items.cartInfo.items.map((item: {
            _id: any;
            Artist: any;
            Name: any;
            UnitPrice: any;
            category: any;
            Image: any;
            amount: any;
            Promotion: any;
          }) => ({
            _id: item._id,
            Artist: item.Artist,
            Name: item.Name,
            UnitPrice: item.UnitPrice,
            category: item.category,
            Image: item.Image,
            amount: item.amount,
            Promotion: item.Promotion
          }))
        }
      },
      this.payments.status // Add the status property here
    );
  
    this._service.putPayment(paymentInfo).subscribe({
      next: (data) => {
        this.payments = data;
        Swal.fire({
          title: 'Success',
          text: 'Product updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (err) => {
        this.errMessage = err;
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the product',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  
    console.log(paymentInfo);
  }
}