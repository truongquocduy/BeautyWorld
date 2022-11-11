import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isShowLogin:boolean = true
  user:User = new User
  route:any = ""
  
  constructor(private UserService:UserService,private toastr:ToastrService,private router:Router) { }
  ngOnInit(): void {
    this.route = this.router
    this.getData()
  }

  updateEventFromChild($event:any) {
    this.user = $event.user;
    this.isShowLogin = $event.isShowLogin
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
        }
        else{
          if(this.route.url == '/carts'){
            this.toastr.error("Lỗi", "Bạn cố gắng can thiệp token")
            sessionStorage.removeItem('_token')
          }
        }
      })
    }
  }
  logout(){
    Swal.fire({
      title: 'Đăng xuất tài khoản ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("_token")
        this.isShowLogin = true
      }
    })
  }
}
