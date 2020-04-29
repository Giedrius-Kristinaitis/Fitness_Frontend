import { Action } from 'redux';
import { ACTIONS } from "../action";
import {
    CompetitionEntityState,
    CompetitionUIListState, CompetitionUIState,
    initialCompetitionEntityState,
    initialCompetitionUIState
} from "../state/competition";

export function competitionEntityReducer(
    state: CompetitionEntityState = initialCompetitionEntityState,
    action: Action
) {
    switch (action.type) {
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED:
            const newState = { ...state };

            // @ts-ignore
            for (const competition of action.payload) {
                newState.entities[competition.id] = competition;
            }

            return newState;
        default:
            return state;
    }
}

export function competitionUIReducer(
    state: CompetitionUIState = initialCompetitionUIState,
    action: Action
) {
    switch (action.type) {
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_STARTED:
            return { ...state, state: CompetitionUIListState.STATE_LOADING };
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_FAILED:
            return { ...state, state: CompetitionUIListState.STATE_FAILED };
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED:
            return { ...state, state: CompetitionUIListState.STATE_LOADED };
        default:
            return state;
    }
}