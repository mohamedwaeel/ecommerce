import { CartService } from 'src/shared/services/cart.service';
import { AuthservicesService } from './../../../shared/services/authservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss'],
})
export class NavbarBlankComponent implements OnInit {
  constructor(
    private _AuthservicesService: AuthservicesService,
    private _CartService: CartService
  ) {}
  cartCounter: number = 0;
  logOutUser(): void {
    this._AuthservicesService.logout();
  }
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartCounter = data;
        console.log(data);
      },
    });
  }
}
