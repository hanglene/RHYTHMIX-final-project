import { NgModule} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdcutNewComponent } from './prodcut-new/prodcut-new.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DelteProductComponent } from './delte-product/delte-product.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { HeaderComponent } from './header/header.component';
import { PaymentAdminComponent } from './payment-admin/payment-admin.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { AdminblogComponent } from './admin-blog/adminblog/adminblog.component';
import { CreateblogComponent } from './admin-blog/createblog/createblog.component';
import { BlogeditComponent } from './admin-blog/blogedit/blogedit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdcutNewComponent,
    AdminViewComponent,
    ProductDetailComponent,
    DelteProductComponent,
    ProductUpdateComponent,
    AdminNavbarComponent,
    HeaderComponent,
    PaymentAdminComponent,
    PaymentDetailComponent,
    AdminblogComponent,
    CreateblogComponent,
    BlogeditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
 CKEditorModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
