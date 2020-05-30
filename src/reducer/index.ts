import { combineReducers } from 'redux';
import { competitionEntityReducer, competitionUIReducer } from "./competition";
import { exerciseEntityReducer, exerciseUIReducer } from "./exercise";


export const mainReducer = combineReducers({
    competitionEntityReducer,
    competitionUIReducer,
    exerciseEntityReducer,
    exerciseUIReducer,

});