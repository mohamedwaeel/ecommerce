import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/shared/services/authservices.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(
    private _AuthservicesService: AuthservicesService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  verifyForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  handleForm(): void {
    if (this.verifyForm.valid) {
      const emailValue = this.verifyForm.get('email')?.value;
      this._AuthservicesService.verifyEmail(emailValue).subscribe({
        next: (response) => {
          this._Router.navigate(['/resetcode']); // Handle the response from the server
          console.log(response);
          // Add additional logic based on the response if needed
        },
        error: (error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        },
      });
    }
  }
}
