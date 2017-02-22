import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import { AddSpawnAction, CreateLevelAction } from '../actions/level';
import { Level, Spawn } from '../models/level';


@Component({
  selector: 'glb-level-builder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Create Level</md-card-title>
      <button (click)="createNew()">Create New Level</button>
    </md-card>

    <glb-level-builder-form [level]="level$ | async" (spawnAdded)="addSpawn($event)"></glb-level-builder-form>    
    <glb-level-detail [level]="level$ | async"></glb-level-detail>
  `
})
export class LevelBuilderPageComponent {  

  public level$: Observable<Level>;
  

  constructor(private store: Store<fromRoot.State>) {
    this.level$ = store.select(fromRoot.getCurrentLevel);
  }

  createNew(){
    this.store.dispatch(new CreateLevelAction());
  }

  addSpawn(spawn: Spawn){
    this.store.dispatch(new AddSpawnAction(spawn));
  }
}
