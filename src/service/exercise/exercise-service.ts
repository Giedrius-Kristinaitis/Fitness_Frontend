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
        videoUrl: data.vaizdoIrasasUrl,
        evalDate: data.ivertinimoData,
        sportId: data.fkPratimasId,
        sportName: data.fkPratimas.pavadinimas,
        sportsmanId: 1,
        trainerId: data.fkTrenerisId
    };
}

const convertExerciseToRequestBody = (exercise: Exercise): object => {
    return {
        kiekis: exercise.num,
        ivertinimas: exercise.eval,
        vaizdoIrasasUrl: exercise.videoUrl,
        fkPratimasId: exercise.sportId,
        fkSportininkasId: exercise.sportsmanId,
        fkTrenerisId: exercise.trainerId,
        ivertinimoData: new Date(exercise.evalDate).toISOString(),
    }
}
const convertExerciseToRequestBodyEssential = (exercise: Exercise): object => {
    return {
        kiekis: exercise.num,
        vaizdoIrasasUrl: exercise.videoUrl,
        fkPratimasId: exercise.sportId,
        fkSportininkasId: exercise.sportsmanId,
    }
}
const openExerciseListPageUser: Function = (id: number, dispatch: Dispatch) => {
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

const openExerciseListPage: Function = (dispatch: Dispatch) => {
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
const openExercisePage: Function = (id: number, dispatch: Dispatch) => {
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

const receiveFormCreate: Function = (exercise: Exercise, dispatch: Dispatch) => {
    dispatch(createCreateExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertExerciseToRequestBodyEssential(exercise)),
    })
        .then(() => dispatch(createCreateExerciseCompletedAction()))
        .catch(() => dispatch(createCreateExerciseFailedAction()));
}

const receiveFormUpdate: Function = (exercise: Exercise, dispatch: Dispatch) => {
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
        method: 'DELETE',
        headers: {
            origin: 'http://127.0.0.1:3000',

        },
    })
        .then(() => dispatch(createDeleteExerciseCompletedAction()))
        .catch(() => dispatch(createDeleteExerciseFailedAction()));
}
const removeRating: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createDeleteExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/rating/delete/${id}`, {
        method: 'PUT',
        headers: {
            origin: 'http://127.0.0.1:3000',

        },
    })
        .then(() => dispatch(createDeleteExerciseCompletedAction()))
        .catch(() => dispatch(createDeleteExerciseFailedAction()));
}
const addRating: Function = (exercise: Exercise, dispatch: Dispatch) => {
    dispatch(createCreateExerciseStartedAction());

    return fetch(`${config.BACKEND_URL}api/exercises/rating/insert/${exercise.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertExerciseToRequestBody(exercise)),
    })
        .then(() => dispatch(createCreateExerciseCompletedAction()))
        .catch(() => dispatch(createCreateExerciseFailedAction()));
}


export { openExerciseListPage, openExerciseListPageUser, openExercisePage, receiveFormCreate, receiveFormUpdate, DeleteExercise, addRating, removeRating };