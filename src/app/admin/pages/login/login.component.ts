import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {Md5} from 'ts-md5'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Aemail:String = ""
  Apassword:String = ""
  constructor(private router:Router,private AdminService:AdminService,private toastr:ToastrService) {}

  ngOnInit(): void {
  }

  login(){
    if(this.Aemail == ""){
      this.toastr.warning("Email không được bỏ trống")
      return
    }
    if(this.Apassword == ""){
      this.toastr.warning("Password không được bỏ trống")
      return
    }
    this.AdminService.getAdmins().then((response:any)=>{
      var md5 = new Md5()
      var existAdmin = response.findIndex((element:any)=>{
        return element.email == this.Aemail && element.password == md5.appendStr(<any>this.Apassword).end()
      })
      if(existAdmin != -1){
        sessionStorage.setItem("token_",JSON.stringify(response[existAdmin].token_));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xin chào Admin',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin'])
      }
      else{
        this.Aemail = ""
        this.Apassword = ""
        Swal.fire(
          'Email hoặc mật khẩu không tồn tại',
          'Vui lòng đăng nhập lại',
          'warning'
        )
      }
    })
  }
}
