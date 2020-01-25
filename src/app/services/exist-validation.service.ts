import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ExistValidationService {
  debouncer: any;
  constructor(public service: UserService, ) { }

  checkEmail(control: FormControl): any {
    clearTimeout(this.debouncer);
    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.service.isEmailRegisterd(control.value).subscribe((res) => {
          if (res) {
            resolve(null);
          }
          else {
            resolve({ 'isEmailUnique': true });
          }
        }, (err) => {
          resolve(null);
        });
      }, 1000);
    });
  }
}
