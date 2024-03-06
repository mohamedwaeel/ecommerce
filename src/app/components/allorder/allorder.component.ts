import { CartItem } from './../../../shared/services/interfaces/order';
import { Component, OnInit } from '@angular/core';
import { AllOrderService } from 'src/shared/services/all-order.service';
import { Order } from 'src/shared/services/interfaces/order';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.scss'],
})
export class AllorderComponent implements OnInit {
  constructor(private _AllOrderService: AllOrderService) {}
  orders: Order[] = [];
  ngOnInit(): void {
    this._AllOrderService
      .allOrder(this._AllOrderService.saveUserData())
      .subscribe({
        next: (response) => {
          this.orders = response;
          console.log(response);
        },
      });
  }
}
