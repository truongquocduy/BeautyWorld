import { Product } from "./product.model"

export class Order {
    id:number = 0
    order_id:string = "O" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + new Date().valueOf()
    carts:Product [] = []
    user_id:number = 0
    user_name:string = ""
    user_email:string = ""
    user_phone:string = ""
    address:string = ""
    created_at:string = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    received_at:string = ""
    status:boolean = false
    transitMethod:string = ""
    paymentMethod:string = ""
    total:number = 0
    transitFee:number = 0
    finalTotal:number = 0
}