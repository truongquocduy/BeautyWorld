import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  targetProduct:Product = new Product
  listCategory: any[] = [
    {
      id: 1,
      name: "Kem"
    },
    {
      id: 2,
      name: "Tẩy trang"
    },
    {
      id: 3,
      name: "Sữa rửa mặt"
    },
    {
      id: 4,
      name: "Sirum"
    }
  ]
  isSetthumbail: boolean = false
  isSetCost: boolean = false
  instock: any = ""
  image: string = "loader.gif"
  thumbnail: string = "loader.gif"
  price: any = ""
  cost: any = ""
  constructor(private toastr: ToastrService,private ProductService:ProductService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    const id:any = this.route.snapshot.paramMap.get('id');
    this.ProductService.getProduct(id).then((response:any)=>{
      this.targetProduct = response
      this.image = response.image
      this.thumbnail = response.thumbnail
      this.instock = response.instock
      this.price = response.price
      this.cost = response.cost
    })

  }
  changeImg(event: any) {
    if (event.target.files.length > 0) {
      this.targetProduct.image = event.target.files[0].name;
      this.image = this.targetProduct.image
    }
  }
  changeThumbnail(event: any) {
    if (event.target.files.length > 0) {
      this.targetProduct.thumbnail[0] = event.target.files[0].name;
      this.thumbnail = this.targetProduct.thumbnail[0]

    }
  }
  changeCostPrice(event:any){
    if(this.cost < this.price){
      this.toastr.error("Giá gốc không được nhỏ hơn giá bán", "Lỗi")
    }
    else{
      this.toastr.success("Giá gốc hợp lệ", "Thành công")
    }
  }
  updateProduct(){
    if (this.targetProduct.name == "") {
      this.toastr.warning("Tên sản phẩm không bỏ trống", "Cảnh báo")
      return
    }
    if (this.targetProduct.trademark == 0) {
      this.toastr.warning("Danh mục không bỏ trống", "Cảnh báo")
      return
    }
    if (this.instock == "") {
      this.toastr.warning("Tồn kho không bỏ trống", "Cảnh báo")
      return
    }
    if (this.targetProduct.intro == "") {
      this.toastr.warning("Intro không bỏ trống", "Cảnh báo")
      return
    }
    if (this.targetProduct.details == "") {
      this.toastr.warning("Detail không bỏ trống", "Cảnh báo")
      return
    }
    if (this.targetProduct.image == "loader.gif") {
      this.toastr.warning("Hình không bỏ trống", "Cảnh báo")
      return
    }
    if (this.targetProduct.thumbnail[0] == "loader.gif") {
      this.toastr.warning("Hình thumbnail không bỏ trống", "Cảnh báo")
      return
    }
    if (this.price == "") {
      this.toastr.warning("Giá không bỏ trống", "Cảnh báo")
      return
    }
    if (this.cost == "") {
      this.toastr.warning("Giá trước sale không bỏ trống", "Cảnh báo")
      return
    }
    this.ProductService.getAllProducts().then((response:any)=>{
      this.targetProduct.instock = <number>this.instock
      this.targetProduct.price = <number>this.price
      this.targetProduct.cost = <number>this.cost
      this.ProductService.updateProduct(this.targetProduct).then(()=>{
        Swal.fire({
          title: 'Cập nhật sản phẩm thành công',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Xem thay đổi',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/products'])
          }
        })
      })
    })
  }
}
