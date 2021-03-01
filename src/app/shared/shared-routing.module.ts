import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCardComponent } from './components/product-card/product-card.component';

const routes: Routes = 
  [ { path: ""
    , component: ProductCardComponent 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
