import { Component, OnInit } from '@angular/core';
import { Product } from '../INTERFACE/Product';
import { ProductAdminService } from '../product-admin.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  products: Product[] = [];
  productName: string = '';
  errMessage: string = '';

  displayCount: number = 4;

  constructor(
    private _service: ProductAdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchProduct();
  }

  searchProduct(): Subscription {
    if (!this.productName) {
      return this._service.getProdcut().subscribe({
        next: (data: Product[]) => {
          this.products = data;
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        }
      });
    } else {
      return this._service.getProduct(this.productName).subscribe({
        next: (data: Product[]) => {
          this.products = data;
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        }
      });
    }
  }

  loadMoreProducts() {
    this.displayCount += 10;
  }
  
  viewProduct(p: Product) {
    this.router.navigate(['productInfor', p._id]);
  }

  putProduct(p: Product) {
    this.router.navigate(['productUpdate', p._id]);
  }

  createProduct() {
    this.router.navigate(['product']);
  }

  deleteProduct(_id: any) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this._service.deleteProduct(_id).subscribe({
          next: (data) => {
            this.products = data;
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          },
          error: (err) => {
            this.errMessage = err;
            Swal.fire('Error!', 'An error occurred while deleting the product.', 'error');
          },
        });
      }
    });
  }
}