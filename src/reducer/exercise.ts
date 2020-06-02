import { Action } from 'redux';
import { ACTIONS } from "../action";
import {
    ExerciseEntityState,
    ExerciseUIListState,
    ExerciseUIState,
    initialExerciseEntityState,
    initialExerciseUIState
} from "../state/exercise";
import { FormMessageType } from "../state";

export function exerciseEntityReducer(
    state: ExerciseEntityState = initialExerciseEntityState,
    action: Action
) {
    const newState = { ...state };

    switch (action.type) {
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_COMPLETED:
            newState.entities = {};

            // @ts-ignore
            for (const exercise of action.payload) {
                newState.entities[exercise.id] = exercise;
            }

            return newState;
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_COMPLETED:
            newState.entities = {};

            // @ts-ignore
            for (const exercise of action.payload) {
                newState.entities[exercise.id] = exercise;
            }

            return newState;
        case ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_COMPLETED:
            // @ts-ignore
            const exercise = action.payload;

            newState.entities[exercise.id] = exercise;

            return newState;
        default:
            return state;
    }
}

export function exerciseUIReducer(
    state: ExerciseUIState = initialExerciseUIState,
    action: Action
) {
    switch (action.type) {
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_STARTED:
            return { ...state, state: ExerciseUIListState.STATE_LOADING };
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_FAILED:
            return { ...state, state: ExerciseUIListState.STATE_FAILED };
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_COMPLETED:
            return { ...state, state: ExerciseUIListState.STATE_LOADED };
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_STARTED:
            return { ...state, state: ExerciseUIListState.STATE_LOADING };
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_FAILED:
            return { ...state, state: ExerciseUIListState.STATE_FAILED };
        case ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_COMPLETED:
            return { ...state, state: ExerciseUIListState.STATE_LOADED };
        case ACTIONS.ACTION_EXERCISE_UPDATE_STARTED:
        case ACTIONS.ACTION_EXERCISE_DELETE_STARTED:
        case ACTIONS.ACTION_EXERCISE_CREATE_STARTED:
        case ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_STARTED:
            return {
                ...state,
                exerciseProcessing: true,
                exerciseFormMessage: null,
                exerciseFormMessageType: FormMessageType.MESSAGE_NONE,
            };
        case ACTIONS.ACTION_EXERCISE_UPDATE_FAILED:
        case ACTIONS.ACTION_EXERCISE_DELETE_FAILED:
        case ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_FAILED:
        case ACTIONS.ACTION_EXERCISE_CREATE_FAILED:
            return {
                ...state,
                exerciseProcessing: false,
                exerciseFormMessage: 'There was an error processing your request. Try again later',
                exerciseFormMessageType: FormMessageType.MESSAGE_ERROR,
            };
        case ACTIONS.ACTION_EXERCISE_UPDATE_COMPLETED:
            return {
                ...state,
                exerciseProcessing: false,
                exerciseFormMessage: 'Successfully updated',
                exerciseFormMessageType: FormMessageType.MESSAGE_SUCCESS,
                redirectToListRequired: true
            };
        case ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_COMPLETED:
            return { ...state, exerciseProcessing: false };
        case ACTIONS.ACTION_EXERCISE_DELETE_COMPLETED:
            return {
                ...state,
                exerciseProcessing: false,
                exerciseFormMessage: null,
                exerciseFormMessageType: FormMessageType.MESSAGE_NONE,
                redirectToListRequired: true,
                exerciseListMessage: 'Successfully deleted',
                exerciseListMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_EXERCISE_CREATE_COMPLETED:
            return {
                ...state,
                exerciseProcessing: false,
                exerciseFormMessage: null,
                exerciseFormMessageType: FormMessageType.MESSAGE_NONE,
                redirectToListRequired: true,
                exerciseListMessage: 'Successfully created',
                exerciseListMessageType: FormMessageType.MESSAGE_SUCCESS,
            };
        case ACTIONS.ACTION_EXERCISE_RESET_REDIRECT_REQUIRED:
            return { ...state, redirectToListRequired: false };
        default:
            return state;
    }
}