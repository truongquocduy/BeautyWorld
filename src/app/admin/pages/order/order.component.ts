import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  listOrder:Order [] = []
  totalOrder:number = 0
  constructor(private OrderService:OrderService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.OrderService.getOrders().then((response:any)=>{
      this.listOrder = response.reverse()
      this.totalOrder = response.length
    })
  }
}
