import { combineReducers } from 'redux';
import { competitionEntityReducer, competitionUIReducer } from "./competition";
import { exerciseEntityReducer, exerciseUIReducer } from "./exercise";
import sportProgramsReducer from './sportprogram';
import coachesReducer from "./coaches";

export const mainReducer = combineReducers({
    competitionEntityReducer,
    competitionUIReducer,
    exerciseEntityReducer,
    exerciseUIReducer,
    sportProgramsReducer,
    coachesReducer
});