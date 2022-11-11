import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  newProduct: Product = new Product
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
  image: string = "no-image.jpg"
  thumbnail: string = "no-image.jpg"
  price: any = ""
  cost: any = ""
  constructor(private toastr: ToastrService,private ProductService:ProductService) { }

  ngOnInit(): void {
  }

  changeImg(event: any) {
    if (event.target.files.length > 0) {
      this.newProduct.image = event.target.files[0].name;
      this.image = this.newProduct.image
    }
  }
  changeThumbnail(event: any) {
    if (event.target.files.length > 0) {
      this.newProduct.thumbnail[0] = event.target.files[0].name;
      this.thumbnail = this.newProduct.thumbnail[0]

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

  createProduct() {
    if (this.newProduct.name == "") {
      this.toastr.warning("Tên sản phẩm không bỏ trống", "Cảnh báo")
      return
    }
    if (this.newProduct.trademark == 0) {
      this.toastr.warning("Danh mục không bỏ trống", "Cảnh báo")
      return
    }
    if (this.instock == "") {
      this.toastr.warning("Tồn kho không bỏ trống", "Cảnh báo")
      return
    }
    if (this.newProduct.intro == "") {
      this.toastr.warning("Intro không bỏ trống", "Cảnh báo")
      return
    }
    if (this.newProduct.details == "") {
      this.toastr.warning("Detail không bỏ trống", "Cảnh báo")
      return
    }
    if (this.newProduct.image == "loader.gif") {
      this.toastr.warning("Hình không bỏ trống", "Cảnh báo")
      return
    }
    if (this.newProduct.thumbnail[0] == "loader.gif") {
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
      this.newProduct.id = response[response.length - 1].id + 1
      this.newProduct.instock = <number>this.instock
      this.newProduct.price = <number>this.price
      this.newProduct.cost = <number>this.cost
      this.ProductService.createProduct(this.newProduct).then(()=>{
        this.toastr.success("Thêm sản phẩm thành công", "Thành công")
        this.newProduct = new Product
        this.instock = ""
        this.price = ""
        this.cost = ""
        this.image = "no-image.jpg"
        this.thumbnail = "no-image.jpg"
      })
    })
  }
}
