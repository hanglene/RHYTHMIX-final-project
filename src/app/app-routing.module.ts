import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdcutNewComponent } from './prodcut-new/prodcut-new.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { DelteProductComponent } from './delte-product/delte-product.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentAdminComponent } from './payment-admin/payment-admin.component';
import { AdminblogComponent } from './admin-blog/adminblog/adminblog.component';
import { BlogeditComponent } from './admin-blog/blogedit/blogedit.component';
import { CreateblogComponent } from './admin-blog/createblog/createblog.component';

const routes: Routes = [ 
   {path: '', component: AdminViewComponent  },
  {path: 'product', component: ProdcutNewComponent  },
  {path:'productInfor/:id',component: ProductDetailComponent },
  {path:'productUpdate/:id',component:ProductUpdateComponent},
  {path:'productDelete/:id',component:DelteProductComponent },
  {path:'paymentDetail/:id',component:PaymentDetailComponent },
  {path:'payment',component: PaymentAdminComponent },
  {path: 'Update/:id', component: BlogeditComponent},
  {path: 'adminBlog', component:AdminblogComponent},
  {path: 'CreateBlog', component: CreateblogComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
