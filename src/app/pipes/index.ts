import { NgModule } from '@angular/core';

import { SortPipe } from './sort.pipe';


export const PIPES = [
  SortPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }