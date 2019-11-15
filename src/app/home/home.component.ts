import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carItem: any; id;
  currentYear: any;
  loader: boolean;
  constructor(private rest: RestService,
    private _avRoute: ActivatedRoute,
    private router: Router) {
    var d = new Date();
    this.currentYear = d.getFullYear();
    if (_avRoute.snapshot.params["id"]) {
      this.id = _avRoute.snapshot.params["id"];
    }
  }

  ngOnInit() {
    this.getCarList();
  }
  getCarList() {
    this.loader = true;
    this.rest.fetch('CarsProduct/GetCarsProduct')
      .subscribe(respo => {
        this.carItem = respo;
        this.loader = false;
        console.log(this.carItem, "Item")
      })
  }
  homeDetails(id) {
    this.router.navigate(["/homeDetails/" + id]);
  }
}
