import { CartService } from './../../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/shared/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  wishlist: any = [];
  addToCartWish(id: string): void {
    this._CartService.addCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
        this.remove(id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  remove(productId: string): void {
    this._WishlistService.removeWish(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.getWishList();
      },
      error(err) {
        console.log(err);
      },
    });
  }
  getWishList(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.wishlist = response.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getWishList();
  }
}
