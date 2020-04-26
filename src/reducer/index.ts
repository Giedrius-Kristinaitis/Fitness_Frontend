import { combineReducers } from 'redux';
import { competitionEntityReducer, competitionUIReducer } from "./competition";

export const mainReducer = combineReducers({
    competitionEntityReducer,
    competitionUIReducer
});