import { Action } from '@ngrx/store';
import { type } from '../util';

import { Level, Spawn } from '../models/level';

export const ActionTypes = {
  LOAD_LEVELS: type('[Level] Load Levels'),
  LOAD_SUCCESS: type('[Level] Load Success'),
  LOAD_FAIL: type('[Level] Load Failed'),
  SELECT_LEVEL:   type('[Level] Select Level'),
  CREATE:  type('[Level] Create Level'),
  CREATE_SUCCESS: type('[Level] Create Level Success'),
  ADD_SPAWN:  type('[Level] Add Spawn'),
  DELETE_SPAWN: type('[Level] Delete Spawn'),
  UPDATE_LEVEL: type('[Level] Update Level'),
  SAVE_LEVEL: type('[Level] Save Level')
};

export class LoadLevelsAction implements Action {
  type = ActionTypes.LOAD_LEVELS;  
}

export class LoadLevelsSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS; 
  constructor(public payload: Array<Level>) {} 
}
export class LoadLevelsFailedAction implements Action {
  type = ActionTypes.LOAD_FAIL;  
  constructor(public payload: any) {}
}

export class SelectLevelAction implements Action {
  type = ActionTypes.SELECT_LEVEL;
  constructor(public payload: string) {}
}

export class CreateLevelAction implements Action {
  type = ActionTypes.CREATE;
}
export class CreateLevelSuccessAction implements Action {
  type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: Level) {}
}

export class AddSpawnAction implements Action {
  type = ActionTypes.ADD_SPAWN;
  constructor(public payload: Spawn) {}
}

export class DeleteSpawnAction implements Action {
  type = ActionTypes.DELETE_SPAWN;
  constructor(public payload: Spawn) {}
}

export class UpdateLevelAction implements Action {
  type = ActionTypes.UPDATE_LEVEL;
  constructor(public payload: Level) {}
}

export class SaveLevelAction implements Action {
  type = ActionTypes.SAVE_LEVEL;
  constructor(public payload: Level) {}    
}


export type Actions
  = LoadLevelsAction
  | LoadLevelsSuccessAction
  | LoadLevelsFailedAction
  | SelectLevelAction
  | CreateLevelAction
  | CreateLevelSuccessAction
  | AddSpawnAction
  | DeleteSpawnAction
  | UpdateLevelAction
  | SaveLevelAction;