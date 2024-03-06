import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { authGuard } from 'src/shared/services/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllorderComponent } from './components/allorder/allorder.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetcodeComponent } from './components/resetcode/resetcode.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'products', component: ProductsComponent, title: 'product' },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      { path: 'wishlist', component: WishlistComponent, title: 'wishlist' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout' },
      { path: 'allorders', component: AllorderComponent, title: 'allorders' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      { path: 'cart', component: CartComponent, title: 'cart' },
      { path: 'details/:id', component: DetailsComponent, title: 'details' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      {
        path: 'forgetpassword',
        component: ForgetpasswordComponent,
        title: 'forgetpasswort',
      },
      {
        path: 'resetcode',
        component: ResetcodeComponent,
        title: 'resetcode',
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent,
        title: 'resetpassword',
      },
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
