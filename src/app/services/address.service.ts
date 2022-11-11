import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {

  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  getProvinces(){
    return this.get('/provinces')
  }
  getProvince(id:string){
    return this.get('/provinces/' + id)
  }
  getDistricts(id:string){
    return this.get('/districts?idProvince=' + id)
  }
  getDistrict(id:string){
    return this.get('/districts/' + id)
  }
  getWards(id:string){
    return this.get('/wards?idDistrict=' + id)
  }
  getWard(id:string){
    return this.get('/wards/' + id)
  }
}
