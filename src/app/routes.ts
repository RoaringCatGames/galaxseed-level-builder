import { Routes } from '@angular/router';

import { LevelBuilderPageComponent } from './containers/level-builder-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: LevelBuilderPageComponent
  },  
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
