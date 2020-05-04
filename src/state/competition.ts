import { FormMessageType } from "./index";

export interface Competition {
    id: number,
    name: string,
    description: string,
    location: string,
    startingDate: string,
    endingDate: string
}

export type CompetitionDictionary = {
    [key: number]: Competition
};

export enum CompetitionUIListState {
    STATE_EMPTY = 'empty',
    STATE_LOADING = 'loading',
    STATE_FAILED = 'failed',
    STATE_LOADED = 'loaded'
}

export interface CompetitionEntityState {
    entities: CompetitionDictionary,
}

export interface CompetitionUIState {
    competitionIds: number[],
    state: CompetitionUIListState,
    competitionProcessing: boolean,
    competitionFormMessage: string | null,
    competitionFormMessageType: FormMessageType,
    redirectToListRequired: boolean,
    competitionListMessage: string | null,
    competitionListMessageType: FormMessageType,
}

export const initialCompetitionEntityState: CompetitionEntityState = {
    entities: {},
}

export const initialCompetitionUIState: CompetitionUIState = {
    competitionIds: [],
    state: CompetitionUIListState.STATE_EMPTY,
    competitionProcessing: false,
    competitionFormMessage: null,
    competitionFormMessageType: FormMessageType.MESSAGE_NONE,
    redirectToListRequired: false,
    competitionListMessage: null,
    competitionListMessageType: FormMessageType.MESSAGE_NONE,
}