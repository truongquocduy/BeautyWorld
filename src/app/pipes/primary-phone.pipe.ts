import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'primaryPhone'
})
export class PrimaryPhonePipe implements PipeTransform {

  transform(value:User , ...args: unknown[]): unknown {
    try {
      return value.address.filter((item:any)=>{
        return item.status
      })[0].phone
    } catch (error) {
      return "Chưa cập nhật"      
    }
  }

}
