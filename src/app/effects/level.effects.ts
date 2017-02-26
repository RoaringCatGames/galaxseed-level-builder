import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { Database } from '@ngrx/db';

import * as level from '../actions/level';

import { Level } from '../models/level';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class LevelEffects {
  constructor(private actions$: Actions, private db: Database) { }

  @Effect({dispatch: false})
  openDB$: Observable<any> = defer(() => {
    return this.db.open('level_builder')
  });

  @Effect()
  loadLevels$: Observable<Action> = this.actions$
    .ofType(level.ActionTypes.LOAD_LEVELS)
    .startWith(new level.LoadLevelsAction())
    .switchMap(() =>
      this.db.query('levels')
        .toArray()
        .map((levels: Array<Level>) => new level.LoadLevelsSuccessAction(levels))
        .catch((error) => of(new level.LoadLevelsFailedAction(error))));


  @Effect()
  updates$: Observable<Action> = this.actions$
    .ofType(level.ActionTypes.UPDATE_LEVEL)  
    .do(() => console.log("Update Action Effect Fired"))  
    .mergeMap(updatedLevel =>
      this.db.insert('levels', [ updatedLevel ])
        .map((lvl) => new level.SelectLevelAction(lvl.id))
        // .catch(() => of(new level.SaveLevelFailAction(level))))
    );

  @Effect()
  save$: Observable<Action> = this.actions$
    .ofType(level.ActionTypes.SAVE_LEVEL)  
    .do(() => console.log("Save Action Effect Fired"))  
    .mergeMap(updatedLevel =>
      this.db.insert('levels', [ updatedLevel.payload ])
        .map((data) => new level.SelectLevelAction(data.id))
        // .catch(() => of(new level.SaveLevelFailAction(level))))
    );
}
