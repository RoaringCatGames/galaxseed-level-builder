import { Routes } from '@angular/router';

import { LevelExistsGuard } from './guards/level-exists.guard';
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
    canActivate: [ LevelExistsGuard ],
    path: 'builder',
    component: LevelBuilderPageComponent
  },
  {
    canActivate: [ LevelExistsGuard ],
    path:'json/:id',  
    component: LevelJsonPageComponent
  },  
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
