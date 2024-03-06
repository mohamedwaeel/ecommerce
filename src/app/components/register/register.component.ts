import { HttpErrorResponse } from '@angular/common/http';
import { AuthservicesService } from './../../../shared/services/authservices.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _AuthservicesService: AuthservicesService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgError: string = '';
  isLoading: boolean = false;

  // registerationForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //   ]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
  //   ]),
  //   rePassword: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
  //   ]),
  //   phone: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^01[0125][0-9]{8}$/),
  //   ]),
  // });
  registerationForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        //!3mlna  string fady bdl el null 3shan lw ktbt 7aga w ms7tha ygyly error required
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] }
  );

  confirmPassword(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ misMatch: true });
    }
  }
  handleForm(): void {
    if (this.registerationForm.valid) {
      this.isLoading = true;
      this._AuthservicesService
        .setRegister(this.registerationForm.value)
        .subscribe({
          next: (response) => {
            if (response.message == 'success') {
              this.isLoading = false;
              this._Router.navigate(['/login']);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.msgError = err.error.message;
          },
        });
    }
  }
}
