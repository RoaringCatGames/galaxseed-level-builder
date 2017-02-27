import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LevelBuilderFormComponent } from './level-builder-form.component';
import { LevelRowComponent } from './level-row.component';
import { LevelDetailComponent } from './level-detail.component';
import { SpawnDetailComponent } from './spawn-detail';
import { SpawnFormDialogComponent } from './spawn-form.component';

import { PipesModule } from '../pipes';


export const COMPONENTS = [
  LevelRowComponent,
  LevelBuilderFormComponent,
  LevelDetailComponent,
  SpawnDetailComponent,
  SpawnFormDialogComponent
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
  exports: COMPONENTS,
  entryComponents:[
    SpawnFormDialogComponent
  ]
})
export class ComponentsModule { }