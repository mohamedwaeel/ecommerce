import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/shared/services/cart.service';
import { EcommercedataService } from 'src/shared/services/ecommercedata.service';
import { Product } from 'src/shared/services/interfaces/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcommercedataService: EcommercedataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  // 3shan a3rf AST5dmha global
  productDetails: Product = {} as Product;
  productSlider: OwlOptions = {
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

  addCartD(id: string): void {
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
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        // api
        this._EcommercedataService.getProductDetails(productId).subscribe({
          next: (response) => {
            this.productDetails = response.data;
          },
        });
      },
    });
  }
}
