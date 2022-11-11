import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  getAllUsers(){
    return this.get("/users")
  }
  getUser(_token:string){
    return this.get("/users?_token=",_token)
  }
  postUser(newUser:User){
    return this.post("/users",newUser)
  }
  updateUser(user:User){
    return this.update("/users/" + user.id, user)
  }
  deleteUserId(id:number){
    return this.delete("/users/" + id)
  }
}
