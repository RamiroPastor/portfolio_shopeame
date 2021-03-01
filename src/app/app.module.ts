
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ​​HttpClientModule​​ } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from'@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppPipesModule } from './app-pipes.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/header/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './layout/hero/hero.component';

import { TitleComponent } from './shared/components/title/title.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { ProductsService} from './shared/services/products.service'

import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { ManagementComponent } from './views/management/management.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ManagementComponent,
    HeroComponent,
    NavComponent,
    TitleComponent,
    ProductCardComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppPipesModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})

export class AppModule {}
