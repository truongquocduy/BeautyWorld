import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {Md5} from 'ts-md5'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Rname:string = ""
  Remail:string = ""
  Rpassword:string = ""
  Lemail:string = ""
  Lpassword:string = ""
  isShowLogin:boolean = true
  user:User = new User
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private UserService:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    if(JSON.parse(sessionStorage.getItem("_token") || '""') != ""){
      this.UserService.getAllUsers().then((response:any)=>{
        var existToken = response.findIndex((item:any)=>{
          return item._token == JSON.parse(sessionStorage.getItem("_token") || '""') 
        })
        if(existToken != -1){
          this.isShowLogin = false
          this.user = response[existToken]
          this.sendLayout()
        }
        else{
          sessionStorage.removeItem('_token')
          this.toastr.error("Lỗi", "Bạn cố gắng can thiệp token")
        }
      })
    }
  }
  register(){
    this.UserService.getAllUsers().then((response:any)=>{
      var existEmail = response.findIndex((item:any)=>{
        return item.email == this.Remail
      })
      if(existEmail == -1){
        const newUser = new User
        const md5 = new Md5()
        newUser.id = (response.length > 0) ? response[response.length-1].id + 1 : 1
        newUser.name = this.Rname
        newUser.email = this.Remail
        newUser.password = <any>md5.appendStr(this.Rpassword).end()
        newUser._token = <any>md5.appendStr(this.Remail + this.Rpassword).end()
        this.UserService.postUser(newUser).then(()=>{
          this.toastr.success("Thành công", "Tạo tài khoản thành công")
        })
      }
      else{
        this.toastr.error("Lỗi", "Email đã tồn tại")
      }
    })
  }
  login(){
    this.UserService.getAllUsers().then((response:any)=>{
      const md5 = new Md5()
      var existUser = response.findIndex((item:any)=>{
        return item.email == this.Lemail && item.password == md5.appendStr(this.Lpassword).end()
      })
      if(existUser != -1){
        sessionStorage.setItem("_token",JSON.stringify(md5.appendStr(this.Lemail + this.Lpassword).end()))
        this.getData()
        this.toastr.success("Thành công", "Đăng nhập thành công")
      }
      else{
        this.Lemail = ""
        this.Lpassword = ""
        this.toastr.error("Lỗi", "Email hoặc mật khẩu sai")
      }
    })
  }
  sendLayout() {
    this.messageEvent.emit({user: this.user, isShowLogin: this.isShowLogin});
  }
}
