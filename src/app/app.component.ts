import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './shared/models/Product';
import { ProductsService } from './shared/services/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  router: string;

  constructor(private _router: Router, private productsService: ProductsService) {
    this.router = _router.url;
  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((data: Product[]) => {
        this.productsService.products = data;
        this.productsService.updatedProductsEmitter.emit(data);
      })
  }
  
}
