import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdcutNewComponent } from './prodcut-new/prodcut-new.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { DelteProductComponent } from './delte-product/delte-product.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentAdminComponent } from './payment-admin/payment-admin.component';

const routes: Routes = [ 
   {path: '', component: AdminViewComponent  },
  {path: 'product', component: ProdcutNewComponent  },
  {path:'productInfor/:id',component: ProductDetailComponent },
  {path:'productUpdate/:id',component:ProductUpdateComponent},
  {path:'productDelete/:id',component:DelteProductComponent },
  {path:'paymentDetail/:id',component:PaymentDetailComponent },
  {path:'payment',component: PaymentAdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
