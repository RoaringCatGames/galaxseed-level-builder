import { createSelector } from 'reselect';
import { Level, Spawn} from '../models/level';

import * as level from '../actions/level';

export interface State {
  ids: string[];
  storedLevels: { [id: string]: Level };
  currentLevelId: string | null;
}

export const initialState: State = {
  ids: ["1"],
  storedLevels: {
    1:{
      id: "1",
      name: "Level 1",
      spawns: []
    }
  },
  currentLevelId: "1"
};

export function reducer(state = initialState, action: level.Actions ): State {
  switch(action.type){

    case level.ActionTypes.SELECT_LEVEL:

      return {
        ids:[...state.ids],
        storedLevels: Object.assign({}, state.storedLevels),
        currentLevelId: action.payload
      };

    case level.ActionTypes.CREATE_LEVEL:
      if(state.currentLevelId === 'NEW'){
        return state;
      }else{
        return {
          ids:[...state.ids, 'NEW'],
          storedLevels: Object.assign({}, state.storedLevels, {NEW:{id:'NEW', name:'New Level', spawns:[]}}),
          currentLevelId: 'NEW'
        };
      }

    case level.ActionTypes.ADD_SPAWN:

      let newSpawn: Spawn = action.payload,
          newSpawns: Array<Spawn> ,
          currentLevel: Level = state.storedLevels[state.currentLevelId];
          
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
        currentLevelId: state.currentLevelId
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
