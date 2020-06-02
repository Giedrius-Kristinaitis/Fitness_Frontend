import { Competition } from "../../state/competition";
import {
    createCreateCompetitionCompletedAction,
    createCreateCompetitionFailedAction,
    createCreateCompetitionStartedAction,
    createDeleteCompetitionCompletedAction,
    createDeleteCompetitionFailedAction,
    createDeleteCompetitionStartedAction,
    createFetchAllCompetitionsCompletedAction,
    createFetchAllCompetitionsFailedAction,
    createFetchAllCompetitionsStartedAction,
    createFetchSingleCompetitionCompletedAction,
    createFetchSingleCompetitionFailedAction,
    createFetchSingleCompetitionStartedAction,
    createJoinCompetitionCompletedAction,
    createJoinCompetitionFailedAction,
    createJoinCompetitionStartedAction,
    createUpdateCompetitionCompletedAction,
    createUpdateCompetitionFailedAction,
    createUpdateCompetitionStartedAction
} from "../../action/competition";
import { Dispatch } from "redux";
import { config } from "../../config";

const extractCompetitionsFromResponse = (data: any): Competition[] => {
    const competitions = [];

    for (const returnedCompetition of data) {
        competitions.push(extractSingleCompetitionFromResponse(returnedCompetition));
    }

    return competitions;
}

const extractSingleCompetitionFromResponse = (data: any): Competition => {
    return {
        id: data.idVarzybos,
        name: data.pavadinimas,
        description: data.aprasas,
        location: data.vieta,
        startingDate: data.prasidejimoData,
        endingDate: data.pabaigosData,
    };
}

const convertCompetitionToRequestBody = (competition: Competition): object => {
    return {
        pavadinimas: competition.name,
        aprasas: competition.description,
        vieta: competition.location,
        prasidejimoData: new Date(competition.startingDate).toISOString(),
        pabaigosData: new Date(competition.endingDate).toISOString(),
    }
}

const openCompetitionsListView: Function = (dispatch: Dispatch) => {
    dispatch(createFetchAllCompetitionsStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch(createFetchAllCompetitionsCompletedAction(extractCompetitionsFromResponse(data)));
        })
        .catch(() => dispatch(createFetchAllCompetitionsFailedAction()));
}

const openCompetitionEditPage: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createFetchSingleCompetitionStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch(createFetchSingleCompetitionCompletedAction(extractSingleCompetitionFromResponse(data)));
        })
        .catch(() => dispatch(createFetchSingleCompetitionFailedAction()));
}

const createCompetition: Function = (competition: Competition, dispatch: Dispatch) => {
    dispatch(createCreateCompetitionStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertCompetitionToRequestBody(competition)),
    })
        .then(() => dispatch(createCreateCompetitionCompletedAction()))
        .catch(() => dispatch(createCreateCompetitionFailedAction()));
}

const updateCompetition: Function = (competition: Competition, dispatch: Dispatch) => {
    dispatch(createUpdateCompetitionStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions/${competition.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertCompetitionToRequestBody(competition)),
    })
        .then(() => dispatch(createUpdateCompetitionCompletedAction()))
        .catch(() => dispatch(createUpdateCompetitionFailedAction()));
}
const joinCompetition: Function = (competition: Competition, userId: number, dispatch: Dispatch) => {
    dispatch(createJoinCompetitionStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions/join/${competition.id}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertCompetitionToRequestBody(competition)),
    })
        .then(response => response.json())
        .then(() => dispatch(createJoinCompetitionCompletedAction()))
        .catch(() => dispatch(createJoinCompetitionFailedAction()));
}

const deleteCompetition: Function = (id: number, dispatch: Dispatch) => {
    dispatch(createDeleteCompetitionStartedAction());

    return fetch(`${config.BACKEND_URL}api/competitions/${id}`, {
        method: 'DELETE'
    })
        .then(() => dispatch(createDeleteCompetitionCompletedAction()))
        .catch(() => dispatch(createDeleteCompetitionFailedAction()));
}

export { openCompetitionsListView, openCompetitionEditPage, createCompetition, updateCompetition, deleteCompetition, joinCompetition };