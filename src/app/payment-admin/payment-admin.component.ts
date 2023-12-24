import { Component } from '@angular/core';
import { PaymentServiceService } from '../payment-service.service';
import { PaymentInfo } from '..//INTERFACE/Payment';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment-admin',
  templateUrl: './payment-admin.component.html',
  styleUrls: ['./payment-admin.component.css']
})
export class PaymentAdminComponent {
  errMessage: any;

  constructor(private _service: PaymentServiceService, private router: Router) {

  }
  displayCount: number = 2;

  loadMoreProducts() {
    this.displayCount += 10;
  }
  ngOnInit() {
    this.searchPayment();
  }

  CustPName: any;
  PaymentInfos: any[] = [];
  searchPayment(): Subscription {
    // Kiểm tra nếu this.CustPName không có giá trị
    if (!this.CustPName) {
      // Gọi phương thức getPayment() từ this._service mà không truyền tham số
      return this._service.getPayment().subscribe({
        next: (data: PaymentInfo[]) => {
          this.PaymentInfos = data;
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        }
      });
    }
  
    // Ngược lại, nếu this.CustPName có giá trị, gọi phương thức getPaymentByCustomerName() với tham số this.CustPName
    return this._service.getPaymentByCustomerName(this.CustPName).subscribe({
      next: (data: PaymentInfo[]) => {
        this.PaymentInfos = data;
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      }
    });
  }
  deletePayment(_id: any) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this._service.deletePayment(_id).subscribe({
          next: (data) => {
            this.PaymentInfos = data;
            Swal.fire('Deleted!', 'The payment has been deleted.', 'success');
          },
          error: (err) => {
            this.errMessage = err;
            Swal.fire('Error!', 'An error payment while deleting the product.', 'error');
          },
        });
      }
    });
  }
viewPayment(p:any)
{
  this.router.navigate(['paymentDetail', p._id])
}  
}