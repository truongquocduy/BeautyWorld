export class Admin{
    id:number = 0
    user:string = ""
    token_:string = ""
    permission:number = 1
    email:string = ""
    password:string = ""
    created_at:string = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
}