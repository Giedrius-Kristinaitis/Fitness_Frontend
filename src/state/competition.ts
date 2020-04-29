export interface Competition {
    id: number,
    pavadinimas: string,
    aprasas: string,
    vieta: string,
    prasidejimoData: string,
    pabaigosData: string
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
    entities: CompetitionDictionary
}

export interface CompetitionUIState {
    competitionIds: number[],
    state: CompetitionUIListState,
}

export const initialCompetitionEntityState: CompetitionEntityState = {
    entities: {}
}

export const initialCompetitionUIState: CompetitionUIState = {
    competitionIds: [],
    state: CompetitionUIListState.STATE_EMPTY,
}