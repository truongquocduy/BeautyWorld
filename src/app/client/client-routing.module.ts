import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CartsComponent } from './pages/carts/carts.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsComponent } from './pages/products/products.component';
import { ResultCheckoutComponent } from './pages/result-checkout/result-checkout.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children:[
      {
        path:"",
        redirectTo:"homepage",
        pathMatch:"full"
      },
      {
        path: "homepage",
        component: HomepageComponent
      },
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "product/:id",
        component: DetailComponent
      },
      {
        path: "carts",
        component: CartsComponent
      },
      {
        path: "result-checkout",
        component: ResultCheckoutComponent
      }
    ]
  },
  {
    path: "search",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
