import { CompetitionEntityState, CompetitionUIState } from "./competition";

export interface AppState {
    competitionEntityReducer: CompetitionEntityState,
    competitionUIReducer: CompetitionUIState,
}

export enum FormMessageType {
    MESSAGE_ERROR = 'error',
    MESSAGE_SUCCESS = 'success',
    MESSAGE_INFO = 'info',
    MESSAGE_NONE = 'none',
}