import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
// import { ProductsComponent } from './views/products/products.component';
// import { ManagementComponent } from './views/management/management.component';

const routes: Routes = 
  [ { path: "home"
    // , component: HomeComponent
    , loadChildren: () => import("./views/home/home.module").then(m => m.HomeModule)
    }
  , { path: "products"
    // , component: ProductsComponent
    , loadChildren: () => import("./views/products/products.module").then(m => m.ProductsModule)
    // , loadChildren: () => import("./shared/components/product-card/product-card.component").then(m => m.ProductCardComponent)
    }
  , { path: "management"
    // , component: ManagementComponent
    , loadChildren: () => import("./views/management/management.module").then(m => m.ManagementModule)
    }
  , { path: '', redirectTo: 'home', pathMatch: 'full' }
  , { path: "**", component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
