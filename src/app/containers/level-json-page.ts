import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as level from '../actions/level';
import { Level } from '../models/level';


@Component({
  selector: 'glb-level-json-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <glb-level-detail-page [isJson]="true"></glb-level-detail-page>
  `
})
export class LevelJsonPageComponent implements OnDestroy {  

  public level$: Observable<Level>;
  
  private actionSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionSubscription = route.params
      .select<string>('id')
      .map(id => new level.SelectLevelAction(id))
      .subscribe(store);    
  } 

  ngOnDestroy(){
    this.actionSubscription.unsubscribe();
  }
}
