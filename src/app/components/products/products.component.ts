import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/shared/services/cart.service';
import { EcommercedataService } from 'src/shared/services/ecommercedata.service';
import { Product } from 'src/shared/services/interfaces/product';
import { WishlistService } from 'src/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _EcommercedataService: EcommercedataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  searchInput: string = '';

  addCartH(id: string): void {
    this._CartService.addCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addwishH(productId: string) {
    this._WishlistService.addWishList(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this._EcommercedataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }
}
