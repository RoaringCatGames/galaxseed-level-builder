import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { Level } from '../models/level';


@Component({
  selector: 'glb-level-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Levels</md-card-title> 
      <md-card-actions>
        <button md-raised-button routerLink="/builder">Build Level</button>
      </md-card-actions>     
    </md-card>    

    <glb-level-row *ngFor="let level of (levels$ | async)" [level]="level"></glb-level-row>    
  `
})
export class LevelListPageComponent {    
  public level$: Observable<Array<Level>>;  

  constructor(private store: Store<fromRoot.State>) {
    this.level$ = store.select(fromRoot.getLevels);
  }
}
