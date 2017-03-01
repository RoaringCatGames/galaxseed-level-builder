import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../reducers';
import * as level from '../actions/level';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class LevelExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the level state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForLevelsLoaded(): Observable<boolean> {
    return this.store.select(fromRoot.getLevelsLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasLevelInStore(id: string): Observable<boolean> {
    return this.store.select(fromRoot.getLevelsMap)      
      .map(entities => !!entities[id])
      .do((i) => console.log("Found", i))
      .take(1);
  }

  hasSelectedLevelInStore(): Observable<boolean> {
    return this.store.select(fromRoot.getCurrentLevelId)
      .filter(id => id !== undefined)
      .map(id => true)
      .take(1);
  }

  hasLevel(id: string): Observable<boolean> {
    if(id === undefined){
      console.log("NO ID");
      return this.hasSelectedLevelInStore();
    }else{
      console.log("ID CHECK", id);
      return this.hasLevelInStore(id)
        .switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }

          return of(false);
        });
    }
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log("SUP!!", route.params, route.params['id']);
    return this.waitForLevelsLoaded()
      .switchMap(() => this.hasLevel(route.params['id']));
  }
}
