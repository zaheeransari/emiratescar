import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidatorsService } from '../services/custom-validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerform: FormGroup;
  password = 'password';
  registerMsg = false;

  constructor(
    private fb: FormBuilder,
    public service: UserService,
    private toastr: ToastrService,
    private customValidatorsService: CustomValidatorsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.registerform = this.fb.group({
      FullName: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Username: [null, [Validators.required], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur' }],
      Email: [null, [Validators.required], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur' }],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit(form: FormGroup) {
    this.service.register(form.value).subscribe(
      (res: any) => {
        debugger
        if (res == null) {
          this.registerform.reset();
          //this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        }
        else {
          this.toastr.success(res.error);
        }
      },
      err => {
        console.log(err);
      }
    );
  } 

}
