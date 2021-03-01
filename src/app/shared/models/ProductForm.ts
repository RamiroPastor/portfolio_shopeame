
import { Product } from './Product';


export interface ProductForm {
  name:  string;
  price: number;
  desc:  string;
  stars: number;
  image: string;
}

export class ProductFormBounds {
  minLenName: number = 1;
  maxLenName: number = 50;
  minLenDesc: number = 1;
  maxLenDesc: number = 100;
  minLenImg:  number = 0;
  maxLenImg:  number = 1000;

  minPrice: number = 0;
  maxPrice: number = 10000;
  minStars: number = 0;
  maxStars: number = 5;
};

export function productFormToProduct(pf: ProductForm):Product {
  let p: Product = 
    { id          : 0
    , name        : pf.name
    , price       : pf.price
    , description : pf.desc
    , stars       : pf.stars
    , image       : pf.image
    }

  p.price = Math.round((p.price + Number.EPSILON) * 100) / 100;
  p.stars = Math.round((p.stars + Number.EPSILON) * 100) / 100;

  return p
}

export function productToProductForm(p: Product): ProductForm {
  let pf: ProductForm =
    { name:  p.name
    , price: p.price
    , desc:  p.description
    , stars: p.stars
    , image: p.image
    }

  return pf
}