export class User{
    _token:string = ""
    id:number = 0
    name:string = ""
    birth:string = ""
    image:string = "undraw_profile.svg"
    email:string = ""
    address:Address [] = []
    password:string = ""
    created_at:string = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
}
export class Address{
    id:number = 0
    province:string = ""
    district:string = ""
    ward:string = ""
    phone:string = ""
    address:string = ""
    details:string = ""
    note:string = ""
    status:boolean = false
}