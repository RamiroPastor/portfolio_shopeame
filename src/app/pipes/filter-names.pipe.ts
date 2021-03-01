import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './../shared/models/Product';


@Pipe({
  name: 'filterNames'
})
export class FilterNamesPipe implements PipeTransform {

  transform(productList: Product[], filterText: string): Product[] {
    const filterT: string = filterText.toLowerCase().trim();

    const filtered = productList.filter((p) => {return p.name.toLowerCase().includes(filterT)});

    return filtered
  }

}
