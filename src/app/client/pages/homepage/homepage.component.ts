import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  listProduct: Product[] = []
  constructor(private ProductServive: ProductService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.ProductServive.getAllProducts().then((response: any) => {
      this.listProduct = response.slice(0,12)
    })
  }
  addCart(product: Product,quality:number = 1) {
    if (product.instock == 0) {
      alert("Sản phẩm đã hết hàng!!!")
      return
    } else {
      if(!Array.isArray(JSON.parse(localStorage.getItem("beauty-carts") || "{}"))){
        localStorage.setItem("beauty-carts",JSON.stringify([]))
      }
      const oldCarts = JSON.parse(localStorage.getItem("beauty-carts") || '[]')
      var existProductItem = oldCarts.findIndex((item:Product)=>{
        return item.id == product.id
      })
      if(existProductItem == -1){
        product.quality = quality
        oldCarts.push(product)
      }
      else{
        oldCarts[existProductItem].quality += quality
      }
      localStorage.setItem("beauty-carts",JSON.stringify(oldCarts))
      this.toastr.success("Thành công", "Đã thêm sản phẩm thành công")
    }
    // if(JSON.parse(localStorage.getItem("beauty-cart") == null;)
    
  }
}
