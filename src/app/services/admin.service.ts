import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  constructor(httpClient: HttpClient){
    super(httpClient);
  }

  getAdmins(){
    return this.get("/admins");
  }
  checkToken(token_:string){
    return this.get("/admins?token_=" + token_);
  }
}
