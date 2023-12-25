import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AccountComponent } from './account/account.component';
import { AccInfoComponent } from './account/acc-info/acc-info.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ListProductComponent } from './list-product/list-product.component';
import { OrdCompletePageComponent } from './ord-complete-page/ord-complete-page.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { AllblogComponent } from './allblog/allblog.component';
import { BlogeditComponent } from './adminblog/blogedit/blogedit.component';
import { BlogComponent } from './adminblog/blog/blog.component';
import { CreatenewblogComponent } from './adminblog/createnewblog/createnewblog.component';
const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'aboutus', component:AboutusComponent},
  {path: 'account', component:AccountComponent},
  {path: 'acc-info', component:AccInfoComponent},
  {path: 'blog-detail', component:BlogDetailComponent},
  {path: 'cart', component:CartComponent},
  {path: 'contactus', component:ContactusComponent},
  {path: 'list-product', component:ListProductComponent},
  {path: 'ord-complete-page', component:OrdCompletePageComponent},
  {path: 'payment', component:PaymentComponent},
  {path: 'product-info', component:ProductinfoComponent},
  {path: 'all-blog', component: AllblogComponent},
  {path: 'Update/:id', component: BlogeditComponent},
  {path: 'adminBlog', component:BlogComponent},
  {path: 'CreateBlog', component: CreatenewblogComponent}
  // {path: '', component:},
  // {path: '*', component:},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})], //cuộn lên đầu trang
  exports: [RouterModule]
})
export class AppRoutingModule { }
