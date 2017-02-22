import { Action } from '@ngrx/store';
import { type } from '../util';

import { Level, Spawn } from '../models/level';

export const ActionTypes = {
  SELECT_LEVEL:   type('[Level] Select Level'),
  CREATE_LEVEL:  type('[Level] Create Level'),
  ADD_SPAWN:  type('[Level] Add Spawn')
};


export class SelectLevelAction implements Action {
  type = ActionTypes.SELECT_LEVEL;

  constructor(public payload: string) {}
}

export class CreateLevelAction implements Action {
  type = ActionTypes.CREATE_LEVEL;
}

export class AddSpawnAction implements Action {
  type = ActionTypes.ADD_SPAWN;
  constructor(public payload: Spawn) {}
}


export type Actions
  = SelectLevelAction
  | CreateLevelAction
  | AddSpawnAction;