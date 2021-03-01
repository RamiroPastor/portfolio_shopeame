import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/models/Product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  searchText: string = "";

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.products;
    this.productsService.updatedProductsEmitter.subscribe( (data: Product[]) => {
      this.products = data
    })
  }

}
