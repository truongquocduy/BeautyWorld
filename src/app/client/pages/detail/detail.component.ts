import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  productTarget:Product = new Product
  constructor(private ProductService:ProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    const id:any = this.route.snapshot.paramMap.get('id');
    this.ProductService.getProduct(id).then((response:any)=>{
      this.productTarget = response
    })
  }
}
