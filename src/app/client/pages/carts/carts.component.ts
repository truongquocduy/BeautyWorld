import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { Address, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  listCarts: Product [] = []
  listProvince: any [] = []
  listDistricts: any [] = []
  listWards: any [] = []
  selectedProvince:string = ""
  selectedDistrict:string = ""
  selectedWard:string = ""
  selectedAddress:string = ""
  selectedPhone:string = ""
  selectedNote:string = ""
  totalCart:number = 0
  isLoader:boolean = false
  transitFee:any = "25000"
  user:User = new User
  showAddress:boolean = false
  address:number = 0
  route:any = ""

  constructor(private ProductService:ProductService,private toastr:ToastrService, private AddressService:AddressService,private UserService:UserService,private router:Router,private OrderService:OrderService) { }

  ngOnInit(): void {
    this.route = this.router
    // this.getUser()
    this.getCarts()
    this.getProvince()
  }
  getCarts(){
    this.listCarts = JSON.parse(localStorage.getItem("beauty-carts") || "[]")
    this.getTotal()
  }
  getUser(){
    var _token = JSON.parse(sessionStorage.getItem("_token") || '""')
    if( _token != ""){
      this.UserService.getUser(_token).then((response:any)=>{
        this.user = response
      })
    }
    else{
      this.toastr.warning("Cảnh báo", "Vui lòng đăng nhập")
    }
  }
  getProvince(){
    this.AddressService.getProvinces().then((response:any)=>{
      this.listProvince = response
    })
  }
  getDistricts(){
    this.AddressService.getDistricts(this.selectedProvince).then((response:any)=>{
      this.listDistricts = response
    })
  }
  getWards(){
    this.AddressService.getWards(this.selectedDistrict).then((response:any)=>{
      this.listWards = response
    })
  }
  getTotal(){
    this.totalCart = 0
    this.listCarts.forEach((item:any)=> {
      this.totalCart += item.quality * item.price
    })
    this.totalCart += parseInt(this.transitFee)
  }
  changeQualityItem(id:number,type:string){
    var existItem = this.listCarts.findIndex((item:any)=>{
      return item.id == id
    })
    if(existItem != -1){
      if(type == "up"){
        this.ProductService.getProduct(id).then((response:any)=>{
          if(response.instock >= this.listCarts[existItem].quality + 1){
            this.listCarts[existItem].quality++
            localStorage.setItem("beauty-carts",JSON.stringify(this.listCarts))
            this.getCarts()
          }
          else{
            this.toastr.error("Lỗi","Không đủ số lượng sản phẩm");
          }
        })
      }
      else{
        if(this.listCarts[existItem].quality != 1){
          this.listCarts[existItem].quality--
          localStorage.setItem("beauty-carts",JSON.stringify(this.listCarts))
          this.getCarts()
        }
        else{
          this.toastr.error("Lỗi","Không thể tiếp tục giảm");
        }
      }
    }else{
      this.toastr.error("Lỗi","Sản phẩm không tồn tại");
    }
  }
  removeItem(id:number){
    var existItem = this.listCarts.findIndex((item:any)=>{
      return item.id == id
    })
    if(existItem != -1){
      this.listCarts.splice(existItem,1)
      localStorage.setItem("beauty-carts",JSON.stringify(this.listCarts))
      this.getCarts()
    }
  }
  updateEventFromChild($event:any) {
    this.user = $event.user;
    this.showAddress = !$event.isShowLogin
    if(this.user.address.length > 0){
      this.address = this.user.address.filter((element:any)=>{
        return element.status
      })[0].id
    }
  }
  addAddress(){
    if(!this.selectedProvince){
      this.toastr.warning("Lỗi","Vui lòng chọn Tỉnh/Thành phố");
      return
    }
    if(!this.selectedDistrict){
      this.toastr.warning("Lỗi","Vui lòng chọn Quận/Huyện");
      return
    }
    if(!this.selectedWard){
      this.toastr.warning("Lỗi","Vui lòng chọn Phường/Xã");
      return
    }
    if(!this.selectedAddress){
      this.toastr.warning("Lỗi","Vui lòng nhập địa chỉ");
      return
    }
    if(!this.selectedPhone){
      this.toastr.warning("Lỗi","Vui lòng nhập số điện thoại");
      return
    }
    const newAddress = new Address
    newAddress.id = (this.user.address.length > 0) ? this.user.address[this.user.address.length-1].id + 1 : 1
    newAddress.province = this.selectedProvince
    newAddress.district = this.selectedDistrict
    newAddress.ward = this.selectedWard
    newAddress.phone = this.selectedPhone
    newAddress.address = this.selectedAddress
    newAddress.note = this.selectedNote
    newAddress.status = (this.user.address.length == 0) ? true : false
    this.AddressService.getProvince(newAddress.province).then((response_province:any)=>{
      this.AddressService.getDistrict(newAddress.district).then((response_district:any)=>{
        this.AddressService.getWard(newAddress.ward).then((response_ward:any)=>{
          newAddress.details = newAddress.address + ", " + response_ward.name + ", " + response_district.name + ", " + response_province.name
          this.user.address.push(newAddress)
          this.address = this.user.address.filter((element:any)=>{
            return element.status
          })[0].id
          this.UserService.updateUser(this.user).then((response:any)=>{
            this.user.address = response.address
          })
        })
      })
    })

  }
  updateAddressDefault(id:number){
    var existAddress = this.user.address.findIndex((item:any)=>{
      return item.id == id
    })
    if(existAddress != -1){
      this.user.address.forEach((element:any)=>{
        element.status = false
      })
      this.user.address[existAddress].status = true;
      this.address = this.user.address.filter((element:any)=>{
        return element.status
      })[0].id
      this.UserService.updateUser(this.user).then((response:any)=>{
        this.user.address = response.address
      })
    }
  }
  spliceAddress(id:number){
    var existAddress = this.user.address.findIndex((item:any)=>{
      return item.id == id
    })
    if(existAddress != -1){
      var addressTmp = this.user.address[existAddress]
      this.user.address.splice(existAddress,1);
      if(this.user.address.length != 0 && addressTmp.status){
        this.user.address[this.user.address.length-1].status = true
      }
      if(this.user.address.length > 0){
        this.address = this.user.address.filter((element:any)=>{
          return element.status
        })[0].id
      }
      else{
        this.address = 0
      }
      this.UserService.updateUser(this.user).then((response:any)=>{
        this.user.address = response.address
      })
    }
  }
  checkout(){
    if(this.user.id == 0){
      this.toastr.warning("Cảnh báo","Vui lòng đăng nhập");
      return
    }
    if(this.listCarts.length == 0){
      this.toastr.warning("Cảnh báo","Giỏ hàng trống");
      return
    }
    if(this.address == 0){
      this.toastr.warning("Cảnh báo","Chưa có địa chỉ nhận hàng");
      return
    }
    const newOrder = new Order
    if(this.transitFee == "25000"){
      var transitmethod = "Giao hàng tiết kiệm"
      var received_at = (new Date().setDate(new Date(newOrder.created_at).getDate() + 10))
    }
    else{
      var transitmethod = "Giao hàng nhanh"
      var received_at = (new Date().setDate(new Date(newOrder.created_at).getDate() + 3))
    }
    newOrder.carts = this.listCarts
    newOrder.user_id = this.user.id
    newOrder.user_name = this.user.name
    newOrder.user_email = this.user.email
    newOrder.address = this.user.address.filter((element:any)=>{
      return element.id == this.address
    })[0].details
    // Ngày nhận từ ngày đặt công 10 ngày
    newOrder.received_at = new Date(received_at).getFullYear() + "-" + (new Date(received_at).getMonth() + 1) + "-" + new Date(received_at).getDate()
    newOrder.transitMethod = transitmethod
    newOrder.paymentMethod = "Thanh toán tiền mặt (COD)"
    newOrder.total = this.totalCart - this.transitFee
    newOrder.transitFee = this.transitFee
    newOrder.finalTotal = this.totalCart
    newOrder.user_phone = this.user.address.filter((element:any)=>{
      return element.id == this.address
    })[0].phone
    this.isLoader = true
    this.OrderService.getOrders().then((response:any)=>{
      if(response.length > 0){
        newOrder.id = response[response.length - 1].id + 1
      }
      else{
        newOrder.id = 1
      }
      this.OrderService.creatOrder(newOrder).then((res:any)=>{
          this.isLoader = false
          localStorage.setItem("beauty-carts",JSON.stringify([]))
          this.router.navigate(['/result-checkout',{order:newOrder.order_id}])
      })
    })
  }
}
