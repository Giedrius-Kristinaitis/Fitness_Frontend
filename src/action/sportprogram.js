import {config} from "../config";

export const REQUEST_SPORTPROGRAMS = 'REQUEST_SPORTPROGRAMS';
export const RECEIVE_SPORTPROGRAMS = 'RECEIVE_SPORTPROGRAMS';
export const REQUEST_SPORTPROGRAM = 'REQUEST_SPORTPROGRAM';
export const RECEIVE_SPORTPROGRAM = 'RECEIVE_SPORTPROGRAM';
export const UPDATE_SPORTPROGRAM = 'UPDATE_SPORTPROGRAM';
export const REQUEST_CREATE_SPORTPROGRAM = 'REQUEST_CREATE_SPORTPROGRAM';
export const CREATE_SPORTPROGRAM_COMPLETED = 'CREATE_SPORTPROGRAM_COMPLETED';
export const CREATE_SPORTPROGRAM_FAILED = 'CREATE_SPORTPROGRAM_FAILED';
export const DELETE_SPORTPROGRAM_REQUEST = 'DELETE_SPORTPROGRAM_REQUEST';
export const DELETE_SPORTPROGRAM_COMPLETED = 'DELETE_SPORTPROGRAM_COMPLETED';
export const RESET_REDIRECTION = 'RESET_REDIRECTION';
export const ADD_NEW_EXERCISE = 'ADD_NEW_EXERCISE';
export const UPDATE_SPORTPROGRAM_REQUEST = 'UPDATE_SPORTPROGRAM_REQUEST';
export const UPDATE_SPORTPROGRAM_REQUEST_FAILED = 'UPDATE_SPORTPROGRAM_REQUEST_FAILED';
export const UPDATE_SPORTPROGRAM_REQUEST_COMPLETED = 'UPDATE_SPORTPROGRAM_REQUEST_COMPLETED';
export const RESET_MESSAGE = 'RESET_MESSAGE';

export function resetMessage() {
    return {
        type: RESET_MESSAGE
    }
}

function updateSportProgramRequest() {
    return {
        type: UPDATE_SPORTPROGRAM_REQUEST
    }
}

function updateSportProgramFailed(message) {
    return {
        type: UPDATE_SPORTPROGRAM_REQUEST_FAILED,
        message
    }
}

function updateSportProgramCompleted(sportprogram) {
    return {
        type: UPDATE_SPORTPROGRAM_REQUEST_COMPLETED,
        updated: sportprogram,
    }
}

export function addNewExercise(sportProgramId, exercise = {}) {
    return {
        type: ADD_NEW_EXERCISE,
        sportProgramId,
        exercise,
    }
}

export function resetRedirection() {
    return {
        type: RESET_REDIRECTION,
    }
}

function deleteSportprogramRequest(id) {
    return {
        type: DELETE_SPORTPROGRAM_REQUEST,
        id
    }
}

function deleteSportProgramCompleted() {
    return {
        type: DELETE_SPORTPROGRAM_COMPLETED
    }
}

function requestCreateSportProgram() {
    return {
        type: REQUEST_CREATE_SPORTPROGRAM,
    }
}

function createSportProgramCompleted(json) {
    return {
        type: CREATE_SPORTPROGRAM_COMPLETED,
        newSportProgram: json,
    }
}

// export function updateSportProgram(data) {
//     return {
//         type: UPDATE_SPORTPROGRAM,
//         updatedSportProgram: data,
//     }
// }


export function requestSportPrograms() {
    return {
        type: REQUEST_SPORTPROGRAMS,
    }
}

export function receiveSportPrograms(json) {
    return {
        type: RECEIVE_SPORTPROGRAMS,
        sportprograms: json
    }
}

export function requestSportProgram(id) {
    return {
        type: REQUEST_SPORTPROGRAM,
        id
    }
}

export function receiveSportProgram(json) {
    return {
        type: RECEIVE_SPORTPROGRAM,
        sportprogram: json
    }
}

export function deleteSportProgram(id) {
    return dispatch => {
        dispatch(deleteSportprogramRequest(id));
        return fetch(`${config.BACKEND_URL}api/sportPrograms/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => dispatch(deleteSportProgramCompleted()));
    }
}

export function createSportProgram(sportProgram) {
    return dispatch => {
        dispatch(requestCreateSportProgram());
        return fetch(`${config.BACKEND_URL}api/sportPrograms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sportProgram)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error("Bad input data")
                });
            }
        })
            .then(json => dispatch(createSportProgramCompleted(json)))
            .catch(e => dispatch(createSportProgramFailed(e)))
    }
}

export function createSportProgramFailed(message) {
    return {
        type: CREATE_SPORTPROGRAM_FAILED,
        message
    }
}

export function editSportProgram(sportProgram) {
    return dispatch => {
        dispatch(updateSportProgramRequest());
        return fetch(`${config.BACKEND_URL}api/sportPrograms/${sportProgram.idSportoPrograma}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sportProgram)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {throw new Error("Bad input data")});
            }
        })
            .then(json => dispatch(updateSportProgramCompleted(json)))
            .catch((e) => dispatch(updateSportProgramFailed(e)));
    }
}

export function fetchAllSportPrograms() {
    return dispatch => {
        dispatch(requestSportPrograms());
        return fetch(`${config.BACKEND_URL}api/sportPrograms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receiveSportPrograms(json)));
    }
}

export function fetchSportProgram(id) {
    return dispatch => {
        dispatch(requestSportProgram(id));
        return fetch(`${config.BACKEND_URL}api/sportPrograms/${id}`)
            .then(response => response.json())
            .then(json => dispatch(receiveSportProgram(json)));
    }
}