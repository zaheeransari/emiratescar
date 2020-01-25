import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { CarImages } from 'src/app/models/carImages';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {
  loader: boolean = false;
  carItem: any; id; userEmail;
  carImages: CarImages[];
  carAlbum: any = [];
  totalCars: any;
  totalCars2: number = 0;;
  constructor(
    private rest: RestService,
    private router: Router,
    private _avRoute: ActivatedRoute,
    private _lightbox: Lightbox
  ) {
    if (_avRoute.snapshot.params["id"]) {
      this.id = _avRoute.snapshot.params["id"];
    }
  }

  ngOnInit() {
    this.getCarDetailsView();
  }
  getCarDetailsView() {debugger
    this.loader = true;
    this.rest.fetch("carsProduct/" + this.id)
      .subscribe(res => {
        debugger
        this.carItem = res;
        console.log("carItem", res, this.carImages);
        //this.carImages = res.carImagesList;
        //this.totalCars = res.carImagesList.length;
        //this.getImages();
        this.loader = false;
        console.log("carItem", res, this.carImages);
      })
  }
  getImages() {
    debugger
    if (this.totalCars2 >= 1) {
      for (var i = this.totalCars-1; i >= 0; i--) {
        this.carAlbum.push({ 'src': this.carImages[i].carsImages, 'caption': 'Imag1', 'thumb': this.carImages[i].carsImages });
        this.totalCars2++;
        break;
      }
    }
    else if(this.totalCars2==0) {
      for (var j = 0; j < this.carImages.length; j++) {
        this.carAlbum.push({ 'src': this.carImages[j].carsImages, 'caption': 'Imag1', 'thumb': this.carImages[j].carsImages });
      }
    }
    console.log(this.carAlbum, "album");
  }
  handleFileInput(file: FileList) {
    this.userEmail = sessionStorage.getItem('email');
    var fileToUpload = file.item(0);
    this.rest.updateimages(this.id, fileToUpload)
      .subscribe((data) => {
        //this.alertService.success(this._global.success_message);
        this.getCarDetailsView();
        this.totalCars2++;
      },
        (err) => {
          //this.alertService.error(this._global.error_message);
        });
  }
  backBtn() {
    this.router.navigate(["/admin/carDetailsList"]);
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.carAlbum, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
