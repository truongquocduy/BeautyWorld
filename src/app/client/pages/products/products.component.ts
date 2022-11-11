import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  baseProduct:Product [] = []
  listProduct:Product [] = []
  showTitleSearch:boolean = false
  searchKey:string = ""
  constructor(private ProductService:ProductService,private toastr:ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.ProductService.getAllProducts().then((response: any) => {
      if(!this.route.snapshot.paramMap.get('search')){
        this.baseProduct = response
        this.listProduct = this.baseProduct
      }
      else{
        this.showTitleSearch = true
        this.searchKey = <string>this.route.snapshot.paramMap.get('search')
        this.listProduct = response.filter((element:any)=>{
          return element.name.toLowerCase().includes(this.searchKey.toLocaleLowerCase())
        })
        // alert("duyBBB".toLowerCase())
      }
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
