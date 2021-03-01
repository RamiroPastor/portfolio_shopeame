import { NgModule } from '@angular/core';
import { FilterNamesPipe } from './pipes/filter-names.pipe';

@NgModule({
  imports: [],
  declarations: [FilterNamesPipe],
  exports: [FilterNamesPipe]
})
export class AppPipesModule { }