import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
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
    var data = {
      userName: loginViewModel.UserName,
      password: loginViewModel.Password,
      // required when signing up with username/password
      grant_type: "password"
    };
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    debugger
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>(BaseURI + "token", this.toUrlEncodedString(data), httpOptions)
      .pipe(map(response => {
        debugger
        if (response) {
          this.currentUserName = response.EmailAddress;          
          sessionStorage.setItem("email", this.currentUserName);
          sessionStorage.setItem("access_token", response.access_token);
          //sessionStorage.currentUser = JSON.stringify(response.body);
          //sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
        }
        return response;
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

  getUserByEmail(email: string): Observable<any> {debugger
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>(BaseURI + "user/checkemail/" + email, { responseType: "json" });
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

  // Converts a Json object to urlencoded format
  toUrlEncodedString(data: any) {
    var body = "";
    for (var key in data) {
      if (body.length) {
        body += "&";
      }
      body += key + "=";
      body += encodeURIComponent(data[key]);
    }
    return body;
  }
}


