import { FormMessageType } from "./index";

export interface Exercise {
    id: number,
    num: number,
    eval: number,
    videoUrl: string,
    evalDate: string,
    sportsmanId: number,
    trainerId: number,
    sportId: number,
    sportName: string,
}

export type ExerciseDictionary = {
    [key: number]: Exercise
};

export enum ExerciseUIListState {
    STATE_EMPTY = 'empty',
    STATE_LOADING = 'loading',
    STATE_FAILED = 'failed',
    STATE_LOADED = 'loaded'
}

export interface ExerciseEntityState {
    entities: ExerciseDictionary,
}

export interface ExerciseUIState {
    exerciseIds: number[],
    state: ExerciseUIListState,
    exerciseProcessing: boolean,
    exerciseFormMessage: string | null,
    exerciseFormMessageType: FormMessageType,
    redirectToListRequired: boolean,
    exerciseListMessage: string | null,
    exerciseListMessageType: FormMessageType,
}

export const initialExerciseEntityState: ExerciseEntityState = {
    entities: {},
}

export const initialExerciseUIState: ExerciseUIState = {
    exerciseIds: [],
    state: ExerciseUIListState.STATE_EMPTY,
    exerciseProcessing: false,
    exerciseFormMessage: null,
    exerciseFormMessageType: FormMessageType.MESSAGE_NONE,
    redirectToListRequired: false,
    exerciseListMessage: null,
    exerciseListMessageType: FormMessageType.MESSAGE_NONE,
}