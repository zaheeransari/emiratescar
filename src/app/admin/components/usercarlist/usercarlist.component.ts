import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercarlist',
  templateUrl: './usercarlist.component.html',
  styleUrls: ['./usercarlist.component.css']
})
export class UsercarlistComponent implements OnInit {
  loader: boolean;
  carItem: any; userEmail;
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getCarProduct();
  }
  getCarProduct() {
    debugger
    this.loader = true;
    this.userEmail = sessionStorage.getItem('email');
    this.rest.fetch('CarsProduct/UserGet/' + this.userEmail).subscribe(res => {
      this.carItem = res;
      this.loader = false;
      console.log(res, "itemCar");
    })
  }
  edit(id) {
    debugger
    this.router.navigate(["/admin/userProductForm/" + id]);
  }
  view(id) {
    this.router.navigate(["/admin/carDetails/" + id])
  }
}
