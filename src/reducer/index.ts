import {combineReducers} from 'redux';
import {competitionEntityReducer, competitionUIReducer} from "./competition";
import sportProgramsReducer from './sportprogram';
import coachesReducer from "./coaches";

export const mainReducer = combineReducers({
    competitionEntityReducer,
    competitionUIReducer,
    sportProgramsReducer,
    coachesReducer
});