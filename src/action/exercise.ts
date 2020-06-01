import { ACTIONS } from "./index";
import { Exercise } from "../state/exercise";
import { Dispatch } from 'redux';
import { CreateExercise, DeleteExercise, GetAllCompletedExercises, GetCompletedExercisesForUser, GetExercise, UpdateExercise } from "../service/exercise/exercise-service";

export const createFetchAllExercisesAction = () => {
    return (dispatch: Dispatch) => {
        GetAllCompletedExercises(dispatch);
    }
}
export const createFetchAllUserExercisesAction = (id: number) => {
    return (dispatch: Dispatch) => {
        GetCompletedExercisesForUser(id, dispatch);
    }
}

export const createFetchSingleExerciseAction = (id: number) => {
    return (dispatch: Dispatch) => {
        GetExercise(id, dispatch);
    }
}

export const createUpdateExerciseAction = (exercise: Exercise) => {
    return (dispatch: Dispatch) => {
        UpdateExercise(exercise, dispatch);
    }
}

export const createDeleteExerciseAction = (id: number) => {
    return (dispatch: Dispatch) => {
        DeleteExercise(id, dispatch);
    }
}

export const createCreateExerciseAction = (exercise: Exercise) => {
    return (dispatch: Dispatch) => {
        CreateExercise(exercise, dispatch);
    }
}

export const createCreateExerciseStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_CREATE_STARTED,
    }
}

export const createCreateExerciseFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_CREATE_FAILED,
    }
}

export const createCreateExerciseCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_CREATE_COMPLETED,
    }
}

export const createDeleteExerciseStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_DELETE_STARTED,
    }
}

export const createDeleteExerciseFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_DELETE_FAILED,
    }
}

export const createDeleteExerciseCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_DELETE_COMPLETED,
    }
}

export const createUpdateExerciseStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_UPDATE_STARTED,
    }
};

export const createUpdateExerciseFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_UPDATE_FAILED,
    }
};

export const createUpdateExerciseCompletedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_UPDATE_COMPLETED,
    }
};

export const createFetchAllExercisesStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_STARTED,
    }
}

export const createFetchAllExercisesFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_FAILED,
    }
}

export const createFetchAllExercisesCompletedAction = (exercises: Exercise[]) => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_COMPLETED,
        payload: exercises,
    }
}


export const createFetchAllUserExercisesStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_STARTED,
    }
}

export const createFetchAllUserExercisesFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_FAILED,
    }
}

export const createFetchAllUserExercisesCompletedAction = (exercises: Exercise[]) => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_ALL_USER_COMPLETED,
        payload: exercises,
    }
}

export const createFetchSingleExerciseStartedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_STARTED,
    }
}

export const createFetchSingleExerciseFailedAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_FAILED,
    }
}

export const createFetchSingleExerciseCompletedAction = (exercise: Exercise) => {
    return {
        type: ACTIONS.ACTION_EXERCISE_FETCH_SINGLE_COMPLETED,
        payload: exercise,
    }
}

export const createExerciseResetRedirectRequiredAction = () => {
    return {
        type: ACTIONS.ACTION_EXERCISE_RESET_REDIRECT_REQUIRED,
    }
}