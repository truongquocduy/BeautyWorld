import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  listProduct:Product [] = []
  totalProduct:number = 0
  constructor(private ProductService:ProductService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.ProductService.getAllProducts().then((response:any)=>{
      this.listProduct = response.reverse()
      this.totalProduct = response.length
    })
  }

  deleteProduct(product:Product){
    Swal.fire({
      title: 'Bạn có chắc xóa sản phẩm này không ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductService.deleteProduct(product).then(()=>{
          this.getData()
          Swal.fire('Thành công!', '', 'success')
    
        })
      }
    })
  }
}
