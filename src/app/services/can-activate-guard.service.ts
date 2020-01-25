import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate
{
  constructor(private loginService : LoginService, private router : Router, private jwtHelperService : JwtHelperService)
  {
  }

  canActivate(route: ActivatedRouteSnapshot) : boolean{
    console.log(this.router.url);
    var token = sessionStorage.getItem("access_token");
    if (token)
    {
      return true; //the user can navigate to the particular route
    }
    // if (this.loginService.isAuthenticated() && this.jwtHelperService.decodeToken(token).role == route.data.expectedRole)
    // {
    //   return true; //the user can navigate to the particular route
    // }
    else
    {
      this.router.navigate([ "login" ]);
      return false; //the user can't navigate to the particular route
    }
  }
}
