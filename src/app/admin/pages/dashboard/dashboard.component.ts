import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ChartRight:any = {
    chartType : 'bar',

    chartDatasets : [
      { data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Doanh thu 2022' }
    ],
  
    chartLabels : ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7', 'Tháng 8', 'Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  
    chartColors : [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ]
  
    
  }
  dataRightChart:any = [0,0,0,0,0,0,0,0,0,0,0,0]
  totalRevenue:number = 0
  totalRevenue_M:number = 0
  totalUser:number = 0
  totalProduct:number = 0
  constructor(private OrderService:OrderService,private UserService:UserService, private ProductService:ProductService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.getOrderData()
    this.getUserData()
    this.getProductData()
  }

  getOrderData(){
    this.dataRightChart = [0,0,0,0,0,0,0,0,0,0,0,0]
    this.OrderService.getOrders().then((response:any)=>{
      response.forEach((element:any)=>{
        let date:any = new Date(element.created_at)
        this.totalRevenue += element.finalTotal
        if(date.getFullYear()==2022){
            this.dataRightChart[(date.getMonth())] += element.finalTotal
            if(date.getMonth() == new Date().getMonth()){
              this.totalRevenue_M += element.finalTotal
            }
        }
      })
      this.ChartRight.chartDatasets =[
        { data: this.dataRightChart, label: 'Doanh thu 2022' }
      ]
    })
  }
  getUserData(){
    this.UserService.getAllUsers().then((response:any)=>{
      this.totalUser = response.length
    })
  }

  getProductData(){
    this.ProductService.getAllProducts().then((response:any)=>{
      this.totalProduct = response.length
    })
  }
}
