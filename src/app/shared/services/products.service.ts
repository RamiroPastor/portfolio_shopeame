import { Injectable, EventEmitter } from '@angular/core';
import { ​​HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { Product } from './../models/Product';

// @Injectable({
//   providedIn: 'root'
// })

const apiUrl = environment.API_URL;

@Injectable()

export class ProductsService {

  public products: Product[] = [];
  public updatedProductsEmitter: EventEmitter<Product[]> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(apiUrl)
  }

  getProduct(pID: number) {
    return this.http.get(apiUrl + "/" + pID)
  }

  deleteProduct(p: Product) {
    // const i = this.products.indexOf(p);
    // this.products.splice(i,1);
    this.products = this.products.filter(prod => prod.id !== p.id);

    this.updatedProductsEmitter.emit(this.products);

    return this.http.delete(apiUrl + "/" + p.id)
  }

  storeProduct(p: Product) {
    if (p.id === 0) {
      const idList = this.products.map((x) => {return x.id});
      const i = Math.max(...idList) + 1;
      p.id = i;
      this.products.push(p);
      this.updatedProductsEmitter.emit(this.products);
      return this.http.post(apiUrl, p)
    } else {
      this.products = this.products.map(x => { if (x.id == p.id) { return p } else { return x } });
      this.updatedProductsEmitter.emit(this.products);
      return this.http.put(apiUrl + "/" + p.id, p)
    }
    
  }

}
