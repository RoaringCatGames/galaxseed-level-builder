import { createSelector } from 'reselect';
import { Level, Spawn} from '../models/level';

import * as level from '../actions/level';

export interface State {
  ids: string[];
  storedLevels: { [id: string]: Level };
  currentLevelId: string | null;
  loaded: boolean;
}

export const initialState: State = {
  ids: [],
  storedLevels: {},
  currentLevelId: undefined,
  loaded: false
};

export function reducer(state = initialState, action: level.Actions ): State {
  switch(action.type){

    case level.ActionTypes.LOAD_SUCCESS:      
      let loadedLevels: Array<Level> = action.payload;

      let levelsMap = loadedLevels.reduce((acc, curr) => Object.assign({}, acc, {[curr.id]:curr}), {});      
      return {
        ids: [...loadedLevels.map((l: Level) => l.id)],
        storedLevels: levelsMap,
        currentLevelId: undefined,
        loaded: true
      };


    case level.ActionTypes.CREATE:
      let newLevel: Level = { length: 20, name:'New Level', spawns:[]};
      let now = new Date();
      newLevel.id = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getMilliseconds()}`;    
      
      return {
        ids: [...state.ids, newLevel.id],
        storedLevels: Object.assign({}, state.storedLevels, {
          [newLevel.id]:newLevel
        }),
        currentLevelId: newLevel.id,
        loaded: state.loaded
      };      

    case level.ActionTypes.SELECT_LEVEL:

      return {
        ids:[...state.ids],
        storedLevels: Object.assign({}, state.storedLevels),
        currentLevelId: action.payload,
        loaded: state.loaded
      };    

    case level.ActionTypes.SAVE_LEVEL:      
     let newLevelToSave: Level = action.payload;

      return {
        ids: [...state.ids],
        storedLevels: Object.assign({}, state.storedLevels, {
          [newLevelToSave.id]: newLevelToSave
        }),
        currentLevelId: state.currentLevelId,
        loaded: state.loaded
      };

    case level.ActionTypes.UPDATE_LEVEL:      
      let updatedLevel: Level = action.payload;

      return {
        ids: [...state.ids],
        storedLevels: Object.assign({}, state.storedLevels, {
          [updatedLevel.id]: updatedLevel
        }),
        currentLevelId: state.currentLevelId,
        loaded: state.loaded
      };
      
    case level.ActionTypes.ADD_SPAWN:
      
      let newSpawn: Spawn = action.payload,
          newSpawns: Array<Spawn> ,
          currentLevel: Level = state.storedLevels[state.currentLevelId];
      if(newSpawn.enemyType != 'COMET'){
        newSpawn = Object.assign({}, newSpawn, {
          midBezierPoint: undefined,
          endPoint: undefined
        });        
      }  
      if(currentLevel !== undefined && currentLevel !== null){
        newSpawns = [...currentLevel.spawns]
      }else{
        newSpawns = [];
      }
      newSpawns.push(newSpawn);

      currentLevel = Object.assign({}, currentLevel, {
        spawns: newSpawns
      });

      return {
        ids: [...state.ids],
        storedLevels: Object.assign({}, state.storedLevels, {
          [currentLevel.id]:currentLevel
        }),
        currentLevelId: state.currentLevelId,
        loaded: state.loaded
      };

    default:
      return state;
  }
};

export const getIds = (state: State) => state.ids;
export const getLevels = (state: State) => state.storedLevels;
export const getCurrentId = (state: State) => state.currentLevelId;

export const getCurrent = createSelector(getLevels, getCurrentId, (levels, currentId) => {
  return levels[currentId];
});

export const getAll = createSelector(getLevels, getIds, (levels, ids) => {  
  return ids.map((id) => levels[id]);
});
