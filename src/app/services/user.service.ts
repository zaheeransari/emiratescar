import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURI } from 'src/environments/environment';
import { Regsiter } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }


  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register(register: Regsiter) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(BaseURI + "user/register", JSON.stringify(register), httpOptions);
  }

  isEmailRegisterd(username: string) {
    var url = BaseURI + "user/checkusername/" + username;
    return this.http.get(url);
  }
  // register(body) {
  //   debugger
  //   // var body = {
  //   //   UserName: this.formModel.value.UserName,
  //   //   Email: this.formModel.value.Email,
  //   //   FullName: this.formModel.value.FullName,
  //   //   Password: this.formModel.value.Passwords.Password
  //   // };
  //   return this.http.post(BaseURI + 'ApplicationUser/Register', body);
  // }

  login(formData) {
    return this.http.post(BaseURI + 'ApplicationUser/Login', formData);
  }
  getUserProfile() {
    var tokenHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(BaseURI + 'UserProfile', { headers: tokenHeader })
  }
}
