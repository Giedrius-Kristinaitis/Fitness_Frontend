import { Exercise } from "../../state/exercise";
import {
    createCreateExerciseCompletedAction,
    createCreateExerciseFailedAction,
    createCreateExerciseStartedAction,
    createDeleteExerciseCompletedAction,
    createDeleteExerciseFailedAction,
    createDeleteExerciseStartedAction,
    createFetchAllExercisesCompletedAction,
    createFetchAllExercisesFailedAction,
    createFetchAllExercisesStartedAction,
    createFetchAllUserExercisesCompletedAction,
    createFetchAllUserExercisesFailedAction,
    createFetchAllUserExercisesStartedAction,
    createFetchSingleExerciseCompletedAction,
    createFetchSingleExerciseFailedAction,
    createFetchSingleExerciseStartedAction,
    createUpdateExerciseCompletedAction,
    createUpdateExerciseFailedAction,
    createUpdateExerciseStartedAction
} from "../../action/exercise";
import { Dispatch } from "redux";
import { config } from "../../config";

const extractExercisesFromResponse = (data: any): Exercise[] => {
    const exercises = [];

    for (const returnedExercise of data) {
        exercises.push(extractSingleExerciseFromResponse(returnedExercise));
    }

    return exercises;
}

const extractSingleExerciseFromResponse = (data: any): Exercise => {
    return {
        id: data.idAtliekamasPratimas,
        num: data.kiekis,
        eval: data.ivertinimas,
        videoUrl: data.vaizdo_irasas_URL,
        evalDate: data.ivertinimo_data,
    };
}

const convertExerciseToRequestBody = (exercise: Exercise): object => {
    return {
        kiekis: exercise.num,
        ivertinimas: exercise.eval,
        vaizdo_irasas_url: exercise.videoUrl,
        ivertinimo_data: new Date(exercise.evalDate).toISOString(),
    }
}

const GetCompletedExercisesForUser: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createFetchAllExercisesStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/performed/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch(createFetchAllUserExercisesCompletedAction(extractExercisesFromResponse(data)));
        })
        .catch(() => dispatch(createFetchAllUserExercisesFailedAction()));
}

const GetAllCompletedExercises: Function = (dispatch: Dispatch) => {
    dispatch(createFetchAllExercisesStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch(createFetchAllExercisesCompletedAction(extractExercisesFromResponse(data)));
        })
        .catch(() => dispatch(createFetchAllExercisesFailedAction()));
}
const GetExercise: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createFetchSingleExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch(createFetchSingleExerciseCompletedAction(extractSingleExerciseFromResponse(data)));
        })
        .catch(() => dispatch(createFetchSingleExerciseFailedAction()));
}

const CreateExercise: Function = (exercise: Exercise, dispatch: Dispatch) => {
    dispatch(createCreateExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertExerciseToRequestBody(exercise)),
    })
        .then(() => dispatch(createCreateExerciseCompletedAction()))
        .catch(() => dispatch(createCreateExerciseFailedAction()));
}

const UpdateExercise: Function = (exercise: Exercise, dispatch: Dispatch) => {
    dispatch(createUpdateExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertExerciseToRequestBody(exercise)),
    })
        .then(() => dispatch(createUpdateExerciseCompletedAction()))
        .catch(() => dispatch(createUpdateExerciseFailedAction()));
}

const DeleteExercise: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createDeleteExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/${id}`, {
        method: 'DELETE'
    })
        .then(() => dispatch(createDeleteExerciseCompletedAction()))
        .catch(() => dispatch(createDeleteExerciseFailedAction()));
}

export { GetAllCompletedExercises, GetCompletedExercisesForUser, GetExercise, CreateExercise, UpdateExercise, DeleteExercise };