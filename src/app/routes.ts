import { Routes } from '@angular/router';

import { LevelListPageComponent } from './containers/level-list-page';
import { LevelBuilderPageComponent } from './containers/level-builder-page';
import { LevelJsonPageComponent } from './containers/level-json-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: LevelListPageComponent
  },
  {
    path: 'builder',
    component: LevelBuilderPageComponent
  },
  {
    path:'json/:id',  
    component: LevelJsonPageComponent
  },  
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
