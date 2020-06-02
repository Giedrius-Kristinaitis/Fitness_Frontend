import {
    REQUEST_SPORTPROGRAMS,
    RECEIVE_SPORTPROGRAMS,
    REQUEST_SPORTPROGRAM,
    RECEIVE_SPORTPROGRAM,
    UPDATE_SPORTPROGRAM,
    CREATE_SPORTPROGRAM_COMPLETED,
    DELETE_SPORTPROGRAM_COMPLETED,
    RESET_REDIRECTION, ADD_NEW_EXERCISE, UPDATE_SPORTPROGRAM_REQUEST_COMPLETED
} from "../action/sportprogram";

const sportProgramsReducer = (state = {isFetching: false, sportprograms: []}, action) => {
    switch (action.type) {
        case REQUEST_SPORTPROGRAMS:
            return {...state, isFetching: true};
        case RECEIVE_SPORTPROGRAMS:
            return {...state, isFetching: false, sportprograms: action.sportprograms};
        case REQUEST_SPORTPROGRAM:
            return {...state, isFetching: true};
        case RECEIVE_SPORTPROGRAM:
            return {...state, isFetching: false, sportprogram: action.sportprogram};
        case CREATE_SPORTPROGRAM_COMPLETED:
            return {...state, redirectToListRequired: true, message: 'Successfully created!'};
        case DELETE_SPORTPROGRAM_COMPLETED:
            return {...state, redirectToListRequired: true, message: 'Successfully deleted!'};
        case RESET_REDIRECTION:
            return {...state, redirectToListRequired: false}
        case ADD_NEW_EXERCISE:
            let allSportPrograms = state.sportprograms.slice();
            for (let i = 0; i < allSportPrograms.length; i++) {
                if (allSportPrograms[i].idSportoPrograma === +action.sportProgramId) {
                    allSportPrograms[i].sportoProgramosPratimas.push({
                        setai: 2321,
                        kartojimai: 0,
                        idSportoProgramosPratimas: 15,
                        fkPratimas: {
                            pavadinimas: "antras pratimas",
                            aprasymas: "antro pratimo aprasymas",
                            nuotraukosUrl: null,
                            verte: 2,
                            idPratimas: 2
                        }
                    });
                }
            }

            return {...state, sportprograms: allSportPrograms}
        case UPDATE_SPORTPROGRAM_REQUEST_COMPLETED:
            return {...state, redirectToListRequired: true, updated: action.updated}
        default:
            return state;
    }
}

export default sportProgramsReducer;