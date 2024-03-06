import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  cartDetails: any = {};

  removeCartItem(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._ToastrService.warning('item removed');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  changeItem(id: string, counter: number): void {
    if (counter > 0) {
      this._CartService.updateItem(id, counter).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        if (response.statusText == 'Not Found') {
          this.cartDetails = '';
        } else {
          this.cartDetails = response.data;
        }
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
