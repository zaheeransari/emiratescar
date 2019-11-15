import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { carProductList } from 'src/app/models/carproduct';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-carproductform',
  templateUrl: './carproductform.component.html',
  styleUrls: ['./carproductform.component.css']
})
export class CarproductformComponent implements OnInit {
  loader: boolean = false;
  carProductList: carProductList
  carProductItem: any;
  carProductForm: any;
  dataActive: boolean;
  progress: number;
  message: string;
  id;
  constructor(
    private rest: RestService,
    private fb: FormBuilder,
    private _router: Router,
    private _avRoute: ActivatedRoute,
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
    this.loader = true;
    this.rest.fetch("CarsProduct/GetbyId/" + id)
      .subscribe(item => {
        this.loader = false;
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
      carsProductName1: [],
      carsKilometers: [],
      carsColor: [],
      carsDoors: [],
      carsPrice: [],
      carsProductDescription: [],
      isActive: [],
      SessionId: []
    });
  }
  SaveCarProduct() {
    if (this.carProductForm.valid) {
      this.loader = true;
      if (this.id > 0) {
        this.carProductList = Object.assign({}, this.carProductForm.value);
        this.carProductList.isActive = this.carProductForm.value.isActive;
        this.rest.post('CarsProduct/Put', this.carProductList)
          .subscribe(data => {
            this.loader = false;
            this.allclear();
          }, error => error)
      }
      else {
        var ss = sessionStorage.getItem("email")
        this.carProductList = Object.assign({}, this.carProductForm.value);
        this.carProductList.carsProductId = 0;
        this.carProductList.isActive = this.carProductForm.value.isActive;
        this.carProductList.SessionId = ss;
        this.rest.post('CarsProduct/Post', this.carProductList)
          .subscribe(data => {
            this.loader = false;
            if (data == "Saved") {
              this.allclear();
            }
          })
      }

    }
  }
  upload(files) {
    debugger
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }

    this.rest.upload('localhost:52268/api/CarsProduct/UploadFile', formData)
      .subscribe(res => {
        const item = res;
      })


    // const uploadReq = new HttpRequest('POST', 'localhost:52268/api/CarsProduct/UploadFile', formData, {
    //   reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    // });
  }
  cancelBtn() {
    debugger
    this._router.navigate(["/admin/carDetailsList"]);
  }
  allclear() {
    this.carProductForm.reset({

    });
  }

}
