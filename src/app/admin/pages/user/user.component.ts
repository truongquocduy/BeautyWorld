import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  listUser:User [] = []
  totalUser:number = 0
  ChartRight:any = {
    chartType : 'line',

    chartDatasets : [
      { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Tốc độ gia tăng trong tháng' }
    ],
  
    chartLabels : ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7', 'Tháng 8', 'Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  }
  dataRightChart:any = [0,0,0,0,0,0,0,0,0,0,0,0]

  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.UserService.getAllUsers().then((response:any)=>{
      this.listUser = response.reverse()
      this.totalUser = response.length
    })
    this.getUserData()
  }
  getUserData(){
    this.dataRightChart = [0,0,0,0,0,0,0,0,0,0,0,0]
    this.UserService.getAllUsers().then((response:any)=>{
      response.forEach((element:any)=>{
        let date:any = new Date(element.created_at)
        if(date.getFullYear()==2022){
            this.dataRightChart[(date.getMonth())] ++
        }
      })
      this.ChartRight.chartDatasets =[
        { data: this.dataRightChart, label: 'Tốc độ gia tăng trong tháng' }
      ]
    })
  }

  deleteUser(id:number){
    Swal.fire({
      title: 'Bạn có chắc xóa khách hàng này không',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.deleteUserId(id).then(()=>{
          this.getData()
          Swal.fire('Thành công!', '', 'success')
        })
      }
    })
  }
}
