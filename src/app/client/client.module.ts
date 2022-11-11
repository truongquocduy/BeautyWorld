import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CartsComponent } from './pages/carts/carts.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './includes/login/login.component';
import { ResultCheckoutComponent } from './pages/result-checkout/result-checkout.component';


@NgModule({
  declarations: [
    HomepageComponent,
    ProductsComponent,
    LayoutComponent,
    SearchComponent,
    DetailComponent,
    CartsComponent,
    LoginComponent,
    ResultCheckoutComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
  ]
})
export class ClientModule { }
