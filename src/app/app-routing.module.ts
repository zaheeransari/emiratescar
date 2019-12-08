import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './layout/content/content.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HomeDetailsComponent } from './home/home-details/home-details.component';

const routes: Routes = [
  //{ path: "", redirectTo: "login", pathMatch: "full" },
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: SignUpComponent }, 
  {
    path: 'admin', component: ContentComponent, canActivate: [ CanActivateGuardService ], data: { expectedRole: "Employee" }, children: [
      // lazy routing
      { path: '', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule)},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
