import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModel } from '../models/sign-up-view-model';
import { BaseURI } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient;

  constructor(private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) {
  }

  currentUserName: string = null;
  role: string = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    debugger
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(BaseURI + "authenticate", loginViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        debugger
        if (response) {
          this.currentUserName = response.body.userName;
          this.role = response.body.role;
          sessionStorage.setItem("email", this.currentUserName);
          sessionStorage.setItem("role", this.role);
          sessionStorage.currentUser = JSON.stringify(response.body);
          sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response.body;
      }));
  }

  public Register(signUpViewModel: SignUpViewModel): Observable<any> {
    debugger
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(BaseURI + "register", signUpViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response => {
        if (response) {
          this.currentUserName = response.body.userName;
          sessionStorage.currentUser = JSON.stringify(response.body);
          sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response.body;
      }));
  }

  getUserByEmail(Email: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(BaseURI + "getUserByEmail/" + Email, { responseType: "json" });
  }

  public Logout() {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated(): boolean {
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    if (this.jwtHelperService.isTokenExpired()) {
      return false; //token is not valid
    }
    else {
      return true; //token is valid
    }
  }
}


