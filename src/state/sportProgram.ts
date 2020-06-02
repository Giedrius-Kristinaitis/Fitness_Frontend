import { FormMessageType } from "./index";

export interface SportProgram {
    id: number,
    name: string,
    description: string,
    pictureUrl: string,

}

export type SportProgramDictionary = {
    [key: number]: SportProgram
};

export enum SportProgramUIListState {
    STATE_EMPTY = 'empty',
    STATE_LOADING = 'loading',
    STATE_FAILED = 'failed',
    STATE_LOADED = 'loaded'
}

export interface SportProgramEntityState {
    entities: SportProgramDictionary,
}

export interface SportProgramUIState {
    sportProgramIds: number[],
    state: SportProgramUIListState,
    sportProgramProcessing: boolean,
    sportProgramFormMessage: string | null,
    sportProgramFormMessageType: FormMessageType,
    redirectToListRequired: boolean,
    sportProgramListMessage: string | null,
    sportProgramListMessageType: FormMessageType,
}

export const initialCompetitionEntityState: SportProgramEntityState = {
    entities: {},
}

export const initialCompetitionUIState: SportProgramUIState = {
    sportProgramIds: [],
    state: SportProgramUIListState.STATE_EMPTY,
    sportProgramProcessing: false,
    sportProgramFormMessage: null,
    sportProgramFormMessageType: FormMessageType.MESSAGE_NONE,
    redirectToListRequired: false,
    sportProgramListMessage: null,
    sportProgramListMessageType: FormMessageType.MESSAGE_NONE,
}