import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CartComponent } from "./cart/cart.component";
import { NgxWebstorageModule } from "ngx-webstorage";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductComponent } from "./product/product.component";
import { LayoutModule } from "@angular/cdk/layout";
import { NgxPaginationModule } from "ngx-pagination";
import { SellerComponent } from "./auth/seller/seller.component";
import { TokenInterceptor } from "./auth/token-interceptor";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ContainerComponent } from './auth/container/container.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { StarsRateComponent } from './stars-rate/stars-rate.component';
import { OfferProductComponent } from './offer-product/offer-product.component';
import { QuantityComponent } from './quantity/quantity.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    AppComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    SellerComponent,
    ForgetPasswordComponent,
    ContainerComponent,
    HeaderComponent,
    SideBarComponent,
    StarsRateComponent,
    OfferProductComponent,
    QuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    LayoutModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),
    SweetAlert2Module.forRoot(),
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
