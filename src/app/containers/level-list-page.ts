import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { CreateLevelAction, SelectLevelAction } from '../actions/level';
import { Level } from '../models/level';


@Component({
  selector: 'glb-level-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-toolbar>
      <span class="toolbar-title">Levels ({{(levels$ | async)?.length}})</span>
      <span class="toolbar-center-spacer"></span>

      <span class="toolbar-actions">
        <button md-raised-button routerLink="/builder" (click)="createNewLevel()">Build Level</button>      
      </span>
    </md-toolbar>    
    
    <glb-level-row *ngFor="let level of (levels$ | async)" [level]="level" (editRequested)="selectLevel($event)"></glb-level-row>    
  `
})
export class LevelListPageComponent {    
  public levels$: Observable<Array<Level>>;  

  constructor(private store: Store<fromRoot.State>) {
    this.levels$ = store.select(fromRoot.getLevels);
  }
  createNewLevel(){
    this.store.dispatch(new CreateLevelAction());
  }

  selectLevel(levelId: string){
    this.store.dispatch(new SelectLevelAction(levelId));
  }
}
