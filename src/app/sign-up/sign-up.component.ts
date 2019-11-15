import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';
import { CustomValidatorsService } from '../services/custom-validators.service';
import { LoginService } from '../services/login.service';
import { SignUpViewModel } from '../models/sign-up-view-model';
import { ToastrService } from 'ngx-toastr';
import { City } from '../models/city';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  genders = ["male", "female"];
  countries: Country[] = [];
  itemCities: City[] = [];
  registerError: string = null;
id=92;
  constructor(
    private countriesService: CountriesService,
    private formBuilder: FormBuilder,
    private customValidatorsService: CustomValidatorsService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    this.countriesService.getCountries().subscribe((response) => {
      this.countries = response;
      console.log(response)
      this. dllGetCities(this.id);
    });

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.email]],
        lastName: ["lastName"],
      }),

      email: [null, [Validators.required], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur' }],
      mobile: [],
      //mobile: [null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      //dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      dateOfBirth: ['01/01/2010'],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: ['Male'],
      countryID: [92, [Validators.required]],
      cityID: [null, [Validators.required]],
      receiveNewsLetters: [true],
      skills: this.formBuilder.array([])
    },
      {
        validators: [
          this.customValidatorsService.compareValidator("confirmPassword", "password")
        ]
      });

    this.signUpForm.valueChanges.subscribe((value) => {
      //console.log(value);
    });
  }

  onSubmitClick() {
    //Display current form value
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);

    if (this.signUpForm.valid) {
      var signUpVieModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpVieModel).subscribe(
        (response) => {
          debugger
          if (response.id) {
            this.toastr.success('New user created!', 'Registration successful.');
            this.allclear();
            this.router.navigate(["/login"]);
          }
          else {
            response.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken', 'Registration failed.');
                  break;

                default:
                  this.toastr.error(element.description, 'Registration failed.');
                  break;
              }
            });
          }
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        });
    }

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    //this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
  }
  allclear() {
    this.signUpForm.reset({

    });
  }
  onAddSkill() {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      skillLevel: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }
  dllGetCities(id) {
    debugger
    this.countriesService.getCities(id)
      .subscribe(res => {
        this.itemCities = res;
      })
  }
  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }
  backBtn() {
    this.router.navigate(["/login"])
  }
}
