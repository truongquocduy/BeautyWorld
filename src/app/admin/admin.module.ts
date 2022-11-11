import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { UserComponent } from './pages/user/user.component';
import { PrimaryPhonePipe } from '../pipes/primary-phone.pipe';
import { LoginComponent } from './pages/login/login.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProductComponent,
    OrderComponent,
    ProductNewComponent,
    PrimaryPhonePipe,
    UserComponent,
    LoginComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot()

  ]
})
export class AdminModule { }
