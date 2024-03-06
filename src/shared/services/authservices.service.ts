import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthservicesService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  userData: any;

  logout(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }

  saveUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken);
      this.userData = decodeToken;
      console.log(this.userData);
    }
  }

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }
  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
  verifyEmail(email: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      { email: email }
    );
  }
  resetCode(code: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      { resetCode: code }
    );
  }
  resetPassword(email: string, password: string): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      {
        email: email,
        newPassword: password,
      }
    );
  }
  decodeToken(token: string): any {
    try {
      // Decode the token
      const decodedToken: any = jwtDecode(token);

      // Access user ID or any other information from the decoded token
      const userId = decodedToken.userId;

      return userId;
    } catch (error) {
      console.error('Error decoding token:');
      return null;
    }
  }
}
