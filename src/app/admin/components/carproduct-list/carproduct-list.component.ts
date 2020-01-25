import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carproduct-list',
  templateUrl: './carproduct-list.component.html',
  styleUrls: ['./carproduct-list.component.css']
})
export class CarproductListComponent implements OnInit {
  loader: boolean;
  carItem: any; userEmail;
  id: number = 0;
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getCarProduct();
  }
  getCarProduct() {
    this.loader = true;
    this.userEmail = sessionStorage.getItem('email');
    //this.rest.fetch('carsProduct/GetProductList/' + this.userEmail).subscribe(res => {debugger
    this.rest.fetch('carsProduct').subscribe(res => {
      debugger
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
