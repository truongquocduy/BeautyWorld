import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: "admin",
    component: LayoutComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "products",
        component: ProductComponent
      },
      {
        path: "products/create",
        component: ProductNewComponent
      },
      {
        path: "products/edit/:id",
        component: EditProductComponent
      },
      {
        path: "orders",
        component: OrderComponent
      },
      {
        path: "users",
        component: UserComponent
      }
    ]
  },
  {
    path: "admin/login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
