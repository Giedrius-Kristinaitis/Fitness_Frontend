import { CompetitionEntityState, CompetitionUIState } from "./competition";

export interface AppState {
    competitionEntityReducer: CompetitionEntityState,
    competitionUIReducer: CompetitionUIState,
}