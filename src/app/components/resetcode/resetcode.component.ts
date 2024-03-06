import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthservicesService } from 'src/shared/services/authservices.service';

@Component({
  selector: 'app-resetcode',
  templateUrl: './resetcode.component.html',
  styleUrls: ['./resetcode.component.scss'],
})
export class ResetcodeComponent {
  constructor(
    private _AuthservicesService: AuthservicesService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  codeForm: FormGroup = this._FormBuilder.group({
    resetCode: ['', [Validators.required]],
  });
  handleForm(): void {
    if (this.codeForm.valid) {
      const codeValue = this.codeForm.get('resetCode')?.value;
      this._AuthservicesService.resetCode(codeValue).subscribe({
        next: (response) => {
          this._Router.navigate(['/resetpassword']); // Handle the response from the server
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
