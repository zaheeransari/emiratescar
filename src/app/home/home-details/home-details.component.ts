import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent implements OnInit {
  id;loader: boolean;
  itemHomeDetails: any;
  constructor(
    private rest: RestService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
  ) {
    if (_avRoute.snapshot.params["id"]) {
      this.id = parseInt(this._avRoute.snapshot.params["id"]);
    }
  }

  ngOnInit() {
    this.getWebSiteDetails();
  }
  getWebSiteDetails() {
    this.loader = true;
    this.rest.fetch('CarsProduct/GetWebsiteDetails/'+this.id)
      .subscribe(respo => {
        this.itemHomeDetails = respo;
        this.loader = false;
        console.log(this.itemHomeDetails, "Item")
      })
  }
}
