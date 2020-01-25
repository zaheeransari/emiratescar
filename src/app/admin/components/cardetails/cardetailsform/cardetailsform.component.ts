import { Component, OnInit } from '@angular/core';
import { carProductList } from 'src/app/models/carproduct';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cardetailsform',
  templateUrl: './cardetailsform.component.html',
  styleUrls: ['./cardetailsform.component.css']
})
export class CardetailsformComponent implements OnInit {
  public submitted: any;
  carProductList: carProductList
  carProductItem: any;
  carProductForm: any;
  dataActive: boolean;
  progress: number;
  message: string;
  id; gId;
  public isActive:any;
  constructor(
    private rest: RestService,
    private fb: FormBuilder,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
  ) {

    if (_avRoute.snapshot.params["id"]) {
      this.id = parseInt(this._avRoute.snapshot.params["id"]);

    }
  }
  StatusItem = [{ 'isActive': true, 'name': 'Active' }, { 'isActive': false, 'name': 'InActive' }];
  ngOnInit() {
    this.InitialProductItem();
    this.GetCarProduct(this.id);
  }
  GetCarProduct(id) {
    debugger
    this.rest.fetch("CarsProduct/GetbyId/" + id)
      .subscribe(item => {
        debugger;
        //this.priceItem = item;
        this.carProductForm.patchValue({
          carsProductId: item.carsProductId,
          carsProductName1: item.carsProductName1,
          carsKilometers: item.carsKilometers,
          carsColor: item.carsColor,
          carsDoors: item.carsDoors,
          carsPrice: item.carsPrice,
          carsProductDescription: item.carsProductDescription,
          isActive: item.isActive
        })
        console.log(item);
      });
  }
  InitialProductItem() {
    this.carProductForm = this.fb.group({
      carsProductId: [],
      carsProductName1: [null, Validators.required],
      carsKilometers: [null, Validators.required],
      carsColor: [],
      carsDoors: [],
      carsPrice: [],
      carsProductDescription: [],
      isActive: [],
      SessionId: []
    });
  }
  SaveCarProduct() {
    debugger
    if (this.carProductForm.valid) {
      if (this.id > 0) {
        this.carProductList = Object.assign({}, this.carProductForm.value);
        this.carProductList.isActive = this.carProductForm.value.isActive;
        this.rest.post('CarsProduct/Put', this.carProductList)
          .subscribe(data => {
            if (data.carsProductId != null) {
              debugger
              this.gId = data.carsProductId;
              this.toastr.success('New product updated successful!');
              this.allclear();
              this.redirect();
            }
          }, error => error)
      }
      else {
        var seesionId = sessionStorage.getItem("email");

        this.carProductList = Object.assign({}, this.carProductForm.value);
        this.carProductList.carsProductId = 0;
        this.carProductList.isActive = this.carProductForm.value.isActive;
        this.carProductList.SessionId = seesionId;
        this.rest.post('carsProduct', this.carProductList)
          .subscribe(data => {
            this.gId = data;
            if (data != null) {
              this.toastr.success('New product save successful!');
              this.allclear();
              this.redirect();
            }
          })
      }

    }
  }
  cancelBtn() {
    this._router.navigate(["/admin/carDetailsList"]);
  }
  allclear() {
    this.carProductForm.reset({

    });
  }
  redirect() {
    this._router.navigate(["/admin/carDetails/" + this.gId]);
  }
  dllGetCities(id) {
  }
}
