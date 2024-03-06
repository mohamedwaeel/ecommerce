import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/shared/services/categories.service';
import { EcommercedataService } from 'src/shared/services/ecommercedata.service';
import { Categories } from 'src/shared/services/interfaces/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _EcommercedataService: EcommercedataService,
    private _CategoriesService: CategoriesService
  ) {}
  categories: Categories[] = [];

  catDetails(id: string): void {
    this._CategoriesService.getSpecificCat(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  ngOnInit(): void {
    this._EcommercedataService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      },
    });
  }
}
