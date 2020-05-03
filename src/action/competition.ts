import { ACTIONS } from "./index";
import { Competition } from "../state/competition";
import { Dispatch } from 'redux';

export const createFetchAllCompetitionsAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(createFetchAllCompetitionsStartedAction());

        setTimeout(() => {
            const competitions: Competition[] = [
                {
                    id: 1,
                    pavadinimas: 'Pirma',
                    aprasas: 'Aprasas 1',
                    vieta: 'Kaunas',
                    prasidejimoData: '2020-04-28',
                    pabaigosData: '2020-04-29'
                },
                {
                    id: 2,
                    pavadinimas: 'Antra',
                    aprasas: 'Aprasas 2',
                    vieta: 'Kauno rajonas',
                    prasidejimoData: '2020-04-28',
                    pabaigosData: '2020-04-29'
                },
                {
                    id: 3,
                    pavadinimas: 'Trecia',
                    aprasas: 'Aprasas 3',
                    vieta: 'Rajono Kaunas',
                    prasidejimoData: '2020-04-28',
                    pabaigosData: '2020-04-29'
                },
            ];

            dispatch(createFetchAllCompetitionsCompletedAction(competitions))
        }, 5000);
    }
}

export const createFetchAllCompetitionsStartedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_STARTED
    }
}

export const createFetchAllCompetitionsFailedAction = () => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_FAILED
    }
}

export const createFetchAllCompetitionsCompletedAction = (competitions: Competition[]) => {
    return {
        type: ACTIONS.ACTION_COMPETITION_FETCH_ALL_COMPLETED,
        payload: competitions
    }
}