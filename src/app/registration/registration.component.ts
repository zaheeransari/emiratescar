import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    public service: UserService, 
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
    ) { }

  ngOnInit() {
    this.InitializeRegistration();
  }
  InitializeRegistration() {
    this.userForm = this.formBuilder.group({
      'FullName': [null, Validators.required],
      'UserName': [null, Validators.required],
      'Email': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {debugger
    this.service.register(form).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
