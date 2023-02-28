import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductComponent } from "./product/product.component";
import { SellerComponent } from "./auth/seller/seller.component";
import { AuthGuard } from "./auth/guard/auth.guard";
import { SellerGuard } from "./auth/guard/seller.guard";
import { PreventLoginGuard } from "./auth/guard/prevent-login.guard";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [PreventLoginGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [PreventLoginGuard],
  },
  {
    path: "user/profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user/add-item",
    component: AddItemComponent,
    canActivate: [AuthGuard],
  },
  { path: "user/cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: "product", component: ProductComponent },
  { path: "forget-password", component: ForgetPasswordComponent},
  {
    path: "register/as/seller",
    component: SellerComponent,
    canActivate: [SellerGuard],
    data: { role: "CUSTOMER" },
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  ProfileComponent,
  HomeComponent,
  RegisterComponent,
  AddItemComponent,
  CartComponent,
  ProductComponent,
  CheckoutComponent,
  ForgetPasswordComponent
];
