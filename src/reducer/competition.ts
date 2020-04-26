import { Action } from 'redux';
import { ACTIONS } from "../action";
import {
    Competition,
    CompetitionDictionary,
    CompetitionUIList,
    competitionUIListInitial,
    CompetitionUIListState
} from "../state/competition";

export function competitionEntityReducer(
    state: CompetitionDictionary = {},
    action: Action
) {
    switch (action.type) {
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED:
            const newState = { ...state };

            // @ts-ignore
            for (const competition: Competition of action.payload) {
                newState[competition.id] = competition;
            }

            return newState;
        default:
            return state;
    }
}

export function competitionUIReducer(
    state: CompetitionUIList = competitionUIListInitial,
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