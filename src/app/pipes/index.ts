import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas';
import { EllipsisPipe } from './ellipsis';
import { SortPipe } from './sort.pipe';


export const PIPES = [
  AddCommasPipe,
  EllipsisPipe,
  SortPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }