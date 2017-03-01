import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { DeleteSpawnAction } from '../actions/level';
import { Level, Spawn } from '../models/level';


@Component({
  selector: 'glb-level-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>{{(level$ | async)?.name}}</md-card-title>
      <a *ngIf="isJson" [routerLink]="'/builder'">Builder</a>
    </md-card>    
    <glb-level-detail [isJson]="isJson" [level]="level$ | async"></glb-level-detail>
  `
})
export class LevelDetailPageComponent {  
  @Input() isJson: boolean = false;

  public level$: Observable<Level>;
  

  constructor(private store: Store<fromRoot.State>) {
    this.level$ = store.select(fromRoot.getCurrentLevel);
  }
}
