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

export type CompetitionUIList = {
    state: CompetitionUIListState,
    competitionIds: number[]
}

export const competitionUIListInitial: CompetitionUIList = {
    state: CompetitionUIListState.STATE_EMPTY,
    competitionIds: []
}