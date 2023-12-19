import { NgModule} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentComponent } from './payment/payment.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';

import { ListPipe } from './list-product/list.pipe';
import { FilterPipe } from './list-product/filter.pipe';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AccountComponent } from './account/account.component';
import { AccInfoComponent } from './account/acc-info/acc-info.component';
import { OrdCompletePageComponent } from './ord-complete-page/ord-complete-page.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { AllblogComponent } from './allblog/allblog.component';
import { AdminCreateNewComponent } from './admin-create-new/admin-create-new.component';
import { TestcartComponent } from './testcart/testcart.component';






@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    AccountComponent,
    AccInfoComponent,
    BlogDetailComponent,
    CartComponent,
    ContactusComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    ListProductComponent,
    FilterPipe,
    ListPipe,
    LoginComponent,
    MenuComponent,
    OrdCompletePageComponent,
    PaymentComponent,
    SignupComponent,
    ProductinfoComponent,
    AllblogComponent,
    AdminCreateNewComponent,
    TestcartComponent
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {

}