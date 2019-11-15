import { Routes, RouterModule } from '@angular/router';
import { CarproductListComponent } from './components/carproduct-list/carproduct-list.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { CardetailsformComponent } from './components/cardetails/cardetailsform/cardetailsform.component';


const childRoutes: Routes = [
    { path: "carDetailsList", component: CarproductListComponent },
    { path: "carDetails/:id", component: CardetailsComponent },
    { path: 'userProductForm', component: CardetailsformComponent },
    { path: "userProductForm/:id", component: CardetailsformComponent },
];

export const AdminRouting = RouterModule.forChild(childRoutes);
