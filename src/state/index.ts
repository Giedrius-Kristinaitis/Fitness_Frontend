import { CompetitionEntityState, CompetitionUIState } from "./competition";
import { SportProgramEntityState, SportProgramUIState} from "./sportProgram";
import { ExerciseEntityState, ExerciseUIState} from "./exercise";

export interface AppState {
    competitionEntityReducer: CompetitionEntityState,
    competitionUIReducer: CompetitionUIState,
    sportProgramEntityReducer: SportProgramEntityState,
    sportsProgramUIReducer: SportProgramUIState,
    exerciseEntityReducer: ExerciseEntityState,
    exerciseUIReducer: ExerciseUIState,
}

export enum FormMessageType {
    MESSAGE_ERROR = 'error',
    MESSAGE_SUCCESS = 'success',
    MESSAGE_INFO = 'info',
    MESSAGE_NONE = 'none',
}