import { CompetitionEntityState, CompetitionUIState } from "./competition";
import { SportProgramEntityState, SportProgramUIState} from "./sportProgram";

export interface AppState {
    competitionEntityReducer: CompetitionEntityState,
    competitionUIReducer: CompetitionUIState,
    sportProgramEntityReducer: SportProgramEntityState,
    sportsProgramUIReducer: SportProgramUIState
}

export enum FormMessageType {
    MESSAGE_ERROR = 'error',
    MESSAGE_SUCCESS = 'success',
    MESSAGE_INFO = 'info',
    MESSAGE_NONE = 'none',
}