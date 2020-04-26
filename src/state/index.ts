import { CompetitionDictionary, CompetitionUIList, CompetitionUIListState } from "./competition";

export interface AppState {
    entities: {
        competitions: CompetitionDictionary
    },
    ui: {
        competitionList: CompetitionUIList
    }
}

export const initialState: AppState = {
    entities: {
        competitions: {}
    },
    ui: {
        competitionList: {
            state: CompetitionUIListState.STATE_EMPTY,
            competitionIds: []
        }
    }
}