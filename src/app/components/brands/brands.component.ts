import { Component, OnInit } from '@angular/core';
import { EcommercedataService } from 'src/shared/services/ecommercedata.service';
import { Brands } from 'src/shared/services/interfaces/brands';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  constructor(private _EcommercedataService: EcommercedataService) {}
  brands: Brands[] = [];
  ngOnInit(): void {
    this._EcommercedataService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
    });
  }
}
