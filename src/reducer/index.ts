import {combineReducers} from 'redux';
import {competitionEntityReducer, competitionUIReducer} from "./competition";
import sportProgramsReducer from './sportprogram';

export const mainReducer = combineReducers({
    competitionEntityReducer,
    competitionUIReducer,
    sportProgramsReducer,
});