import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchKey:string = ""
  constructor(private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  searchItem(){
    if(this.searchKey == ""){
      this.toastr.warning("Cảnh báo", "Vui lòng nhập từ khóa")
      return
    }
    this.router.navigate(['/products',{search:this.searchKey}])
  }
}
