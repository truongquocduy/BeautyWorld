import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  creatOrder(newOrder:Order){
    return this.post("/orders",newOrder)
  }
  getOrders(){
    return this.get("/orders")
  }
  getOrder(order_id:string){
    return this.get("/orders?order_id=" + order_id)
  }
}
