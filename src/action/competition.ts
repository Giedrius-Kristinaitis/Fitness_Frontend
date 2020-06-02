import { ACTIONS } from "./index";
import { Competition } from "../state/competition";
import { Dispatch } from 'redux';
import {
    create,
    deleteById,
    getAll,
    getById,
    update,
    joinCompetition
} from "../service/competition/competition-service";

export const createFetchAllCompetitionsAction = () => {
    return (dispatch: Dispatch) => {
        getAll(dispatch);
    }
}

export const createFetchSingleCompetitionAction = (id: number) => {
    return (dispatch: Dispatch) => {
        getById(id, dispatch);
    }
}

export const createUpdateCompetitionAction = (competition: Competition) => {
    return (dispatch: Dispatch) => {
        update(competition, dispatch);
    }
}

export const createJoinCompetitionAction = (competition: Competition, userId: number) => {
    return (dispatch: Dispatch) => {
        joinCompetition(competition, userId, dispatch);
    }
}

export const createDeleteCompetitionAction = (id: number) => {
    return (dispatch: Dispatch) => {
        deleteById(id, dispatch);
    }
}

export const createCreateCompetitionAction = (competition: Competition) => {
    return (dispatch: Dispatch) => {
        create(competition, dispatch);
    }
}

export const createCreateCompetitionStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_CREATE_STARTED,
    }
}

export const createCreateCompetitionFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_CREATE_FAILED,
    }
}

export const createCreateCompetitionCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_CREATE_COMPLETED,
    }
}

export const createDeleteCompetitionStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_DELETE_STARTED,
    }
}

export const createDeleteCompetitionFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_DELETE_FAILED,
    }
}

export const createDeleteCompetitionCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_DELETE_COMPLETED,
    }
}

export const createUpdateCompetitionStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_UPDATE_STARTED,
    }
};

export const createUpdateCompetitionFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_UPDATE_FAILED,
    }
};

export const createUpdateCompetitionCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_UPDATE_COMPLETED,
    }
};
export const createJoinCompetitionStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_JOIN_STARTED,
    }
};

export const createJoinCompetitionFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_JOIN_FAILED,
    }
};

export const createJoinCompetitionCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_JOIN_COMPLETED,
    }
};
export const createFetchAllCompetitionsStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_STARTED,
    }
}

export const createFetchAllCompetitionsFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_FAILED,
    }
}

export const createFetchAllCompetitionsCompletedAction = (competitions: Competition[]) => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED,
        payload: competitions,
    }
}

export const createFetchSingleCompetitionStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_STARTED,
    }
}

export const createFetchSingleCompetitionFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_FAILED,
    }
}

export const createFetchSingleCompetitionCompletedAction = (competition: Competition) => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_SINGLE_COMPLETED,
        payload: competition,
    }
}

export const createCompetitionResetRedirectRequiredAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_RESET_REDIRECT_REQUIRED,
    }
}