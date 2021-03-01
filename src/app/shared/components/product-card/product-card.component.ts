import { Component, Input, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Product } from './../../models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
  }

  @Input() product: Product
  @Input() hideControls: Boolean

  public buttonDeleteFunction() {
    this.productsService.deleteProduct(this.product).subscribe();
  }


}
