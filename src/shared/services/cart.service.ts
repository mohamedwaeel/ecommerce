import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  cartApi: string = 'https://ecommerce.routemisr.com/api/v1/cart';
  addCart(productId: string): Observable<any> {
    return this._HttpClient.post(this.cartApi, {
      //el awlanya dy esmha fy el api fy el body w ael tranya dy el params
      productId: productId,
    });
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(this.cartApi);
  }

  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(this.cartApi + `/${id}`);
  }
  updateItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(this.cartApi + `/${id}`, {
      count: count,
    });
  }
  checkOut(cardId: string, userDetails: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:4200`,
      {
        shippingAddress: userDetails,
      }
    );
  }

  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }
}
