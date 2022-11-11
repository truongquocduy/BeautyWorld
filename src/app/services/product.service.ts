import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{
  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  getAllProducts(){
    return this.get('/products')
  }
  getProduct(id:number){
    return this.get('/products/' + id)
  }
  createProduct(product:Product){
    return this.post('/products',product)
  }
  updateProduct(product:Product){
    return this.update('/products/' + product.id, product)
  }
  deleteProduct(product:Product){
    return this.delete('/products/' + product.id)
  }
}
