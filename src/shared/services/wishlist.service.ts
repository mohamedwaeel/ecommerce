import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}
  wishListApi: string = 'https://ecommerce.routemisr.com/api/v1/wishlist';
  addWishList(productId: string): Observable<any> {
    return this._HttpClient.post(this.wishListApi, { productId: productId });
  }
  getWishList(): Observable<any> {
    return this._HttpClient.get(this.wishListApi);
  }
  removeWish(productId: string): Observable<any> {
    return this._HttpClient.delete(this.wishListApi + `/${productId}`);
  }
}
