import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../models/login-view-model';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader: boolean;
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginForm: FormGroup;
  email = '';
  password = '';
  //matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  loginError: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private toster: ToastrService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    debugger
  }
  onLoginClick(event) {debugger
    this.loader = true;
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) => {
        debugger
        this.loader = false;
        this.router.navigateByUrl("/admin/carDetailsList");
      },
      (error) => {
        this.loader = false;
        console.log(error);
        this.toster.error(error.description,'Registration failed.');
        this.router.navigate(["/login"]);
      },
    );
  }

  // onFormSubmit(form: NgForm) {
  //   debugger
  //   this.user.login(form)
  //     .subscribe((res: any) => {
  //       debugger
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('userName', res.userName);
  //       this.router.navigateByUrl('/');
  //     },
  //       err => {
  //         if (err.status == 400) {
  //           this.toster.error('Incorrect username or password.', 'Authentication failed.');
  //         }
  //         else
  //           console.log(err);
  //       }
  //     );
  // }
}
