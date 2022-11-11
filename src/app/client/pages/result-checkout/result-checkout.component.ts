import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-result-checkout',
  templateUrl: './result-checkout.component.html',
  styleUrls: ['./result-checkout.component.scss']
})
export class ResultCheckoutComponent implements OnInit {
  order:Order = new Order
  constructor(private route: ActivatedRoute, private OrderService:OrderService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    const id:any = this.route.snapshot.paramMap.get('order');
    this.OrderService.getOrder(id).then((response:any)=>{
      if(response.length > 0){
        this.order = response[0]
      }
      else{
        alert("Order không tồn tại")
      }
    })
  }
}
