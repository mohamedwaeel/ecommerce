import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/shared/services/authservices.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent {
  constructor(
    private _AuthservicesService: AuthservicesService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  resetForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });
  handleForm(): void {
    if (this.resetForm.valid) {
      const emailValue = this.resetForm.get('email')?.value;
      const passValue = this.resetForm.get('newPassword')?.value;
      this._AuthservicesService.resetPassword(emailValue, passValue).subscribe({
        next: (response) => {
          this._Router.navigate(['/home']); // Handle the response from the server
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
