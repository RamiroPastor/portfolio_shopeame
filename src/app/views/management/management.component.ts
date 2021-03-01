import { ActivatedRoute } from '@angular/router';
import { ProductFormBounds, productToProductForm } from './../../shared/models/ProductForm';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from "../../shared/models/Product";
import { ProductForm, productFormToProduct } from "../../shared/models/ProductForm";
import { ProductsService } from './../../shared/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public formGroup: FormGroup = null;
  public bounds: ProductFormBounds = new ProductFormBounds;
  public msgOkDisplay: boolean = false;
  public msgOkFade: boolean = true;

  productFormToProduct = productFormToProduct;

  productID: number;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private route: ActivatedRoute) {

    const isImgUrlRegExp = "https?:\/\/.*\.(?:png|jpg|jpeg|svg)";

    this.formGroup = this.formBuilder.group(
      { name:  ["", this.lengthValidators(this.bounds.minLenName, this.bounds.maxLenName)]
      , desc:  ["", this.lengthValidators(this.bounds.minLenDesc, this.bounds.maxLenDesc)]
      , image: ["", this.lengthValidators(this.bounds.minLenImg , this.bounds.maxLenImg).concat([Validators.pattern(isImgUrlRegExp)]) ]
      , price: ["", [Validators.required, Validators.min(this.bounds.minPrice), Validators.max(this.bounds.maxPrice)]]
      , stars: ["", [Validators.required, Validators.min(this.bounds.minStars), Validators.max(this.bounds.maxStars)]]
      })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let pID:any = params.get("productID");
      if (pID) {
        pID = parseInt(pID);
        this.productsService.getProduct(pID).subscribe( 
          (p: Product) => {
            this.formGroup.setValue(productToProductForm(p));
            this.productID = pID;
          },
          (err: HttpErrorResponse) => {
            this.productID = 0;
          });
      } else {
        this.productID = 0;
      }
    })
  }

  private lengthValidators(minL: number, maxL: number): Validators[] {
    return [Validators.required, Validators.minLength(minL), Validators.maxLength(maxL)]
  }

  public onSubmit():void {
    if (this.formGroup.valid) {
      const pf: ProductForm  = 
        { name:  this.formGroup.get("name").value
        , price: this.formGroup.get("price").value
        , desc:  this.formGroup.get("desc").value
        , stars: this.formGroup.get("stars").value
        , image: this.formGroup.get("image").value
        };

      const p: Product = productFormToProduct(pf);
      p.id = this.productID

      this.productsService.storeProduct(p).subscribe();

      this.formGroup.reset();
      this.msgOkFade = false;
      this.msgOkDisplay = true;
      setTimeout( () => this.msgOkFade = true, 1000 );
      setTimeout( () => this.msgOkDisplay = false, 2000);
    }
  }

}
