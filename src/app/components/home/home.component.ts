import { HttpClient } from '@angular/common/http';
import { Category } from './../../../shared/services/interfaces/product';
import { Categories } from './../../../shared/services/interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { EcommercedataService } from 'src/shared/services/ecommercedata.service';
import { Product } from 'src/shared/services/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/shared/services/wishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcommercedataService: EcommercedataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  Category: Categories[] = [];
  searchInput: string = '';
  categorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: true,
  };

  addCartH(id: string): void {
    this._CartService.addCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
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

    this._EcommercedataService.getCategories().subscribe({
      next: (response) => {
        this.Category = response.data;
      },
    });
  }
}
