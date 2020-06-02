import { Action } from 'redux';
import { ACTIONS } from "../action";
import {
    CompetitionEntityState,
    CompetitionUIListState,
    CompetitionUIState,
    initialCompetitionEntityState,
    initialCompetitionUIState
} from "../state/competition";
import { FormMessageType } from "../state";

export function competitionEntityReducer(
    state: CompetitionEntityState = initialCompetitionEntityState,
    action: Action
) {
    const newState = { ...state };

    switch (action.type) {
        case ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED:
            newState.entities = {};

            // @ts-ignore
            for (const competition of action.payload) {
                newState.entities[competition.id] = competition;
            }

            return newState;
        case ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_COMPLETED:
            // @ts-ignore
            const competition = action.payload;

            newState.entities[competition.id] = competition;

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
        case ACTIONS.ACTION_COMPETITION_UPDATE_STARTED:
        case ACTIONS.ACTION_COMPETITION_DELETE_STARTED:
        case ACTIONS.ACTION_COMPETITION_CREATE_STARTED:
        case ACTIONS.ACTION_COMPETITION_JOIN_STARTED:
        case ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_STARTED:
            return {
                ...state,
                competitionProcessing: true,
                competitionFormMessage: null,
                competitionFormMessageType: FormMessageType.MESSAGE_NONE,
            };
        case ACTIONS.ACTION_COMPETITION_UPDATE_FAILED:
        case ACTIONS.ACTION_COMPETITION_DELETE_FAILED:
        case ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_FAILED:
        case ACTIONS.ACTION_COMPETITION_JOIN_FAILED:
        case ACTIONS.ACTION_COMPETITION_CREATE_FAILED:
            return {
                ...state,

                competitionProcessing: false,
                competitionFormMessage: 'There was an error processing your request. Try again later',
                competitionFormMessageType: FormMessageType.MESSAGE_ERROR,
                competitionListMessageType: FormMessageType.MESSAGE_ERROR,
                competitionListMessage: 'There was an error processing your request. Try again later',

            };
        case ACTIONS.ACTION_COMPETITION_UPDATE_COMPLETED:
            return {
                ...state,
                competitionProcessing: false,
                redirectToListRequired: true,
                competitionFormMessage: 'Successfully updated',
                competitionFormMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_COMPLETED:
            return { ...state, competitionProcessing: false };
        case ACTIONS.ACTION_COMPETITION_DELETE_COMPLETED:
            return {
                ...state,
                competitionProcessing: false,
                competitionFormMessage: null,
                competitionFormMessageType: FormMessageType.MESSAGE_NONE,
                redirectToListRequired: true,
                competitionListMessage: 'Successfully deleted',
                competitionListMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_COMPETITION_CREATE_COMPLETED:
            return {
                ...state,
                competitionProcessing: false,
                competitionFormMessage: null,
                competitionFormMessageType: FormMessageType.MESSAGE_NONE,
                redirectToListRequired: true,
                competitionListMessage: 'Successfully created',
                competitionListMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_COMPETITION_JOIN_COMPLETED:
            return {
                ...state,
                competitionProcessing: false,
                competitionFormMessage: null,
                competitionFormMessageType: FormMessageType.MESSAGE_NONE,
                redirectToListRequired: true,
                competitionListMessage: 'Successfully Joined',
                competitionListMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_COMPETITION_RESET_REDIRECT_REQUIRED:
            return { ...state, redirectToListRequired: false };
        default:
            return state;
    }
}