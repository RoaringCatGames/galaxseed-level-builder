import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LevelBuilderFormComponent } from './level-builder-form';
import { LevelDetailComponent } from './level-detail';
import { SpawnDetailComponent } from './spawn-detail';

import { PipesModule } from '../pipes';


export const COMPONENTS = [
  LevelBuilderFormComponent,
  LevelDetailComponent,
  SpawnDetailComponent,
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }