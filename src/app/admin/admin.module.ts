import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouting } from './admin.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { CarproductListComponent } from './components/carproduct-list/carproduct-list.component';
import { CarproductformComponent } from './components/carproduct-list/carproductform/carproductform.component';
import { PagingPipe } from './components/pipe/paging.pipe';
import { FilterdataPipe } from './components/pipe/filterdata.pipe';
import { GrdFilterPipe } from './components/pipe/filtergrid.pipe';
import { UsercarlistComponent } from './components/usercarlist/usercarlist.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { CardetailsformComponent } from './components/cardetails/cardetailsform/cardetailsform.component';
import { TestformComponent } from './components/testform/testform.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';

@NgModule({
  declarations: [   
    PagingPipe,
    FilterPipe,FilterdataPipe,GrdFilterPipe,
    CarproductListComponent,
    CarproductformComponent,
    UsercarlistComponent,
    CardetailsComponent,
    CardetailsformComponent,
    TestformComponent,
    LightboxComponent
  ],
  imports: [
    CommonModule,AdminRouting,ReactiveFormsModule,FormsModule
  ]
})
export class AdminModule { }
