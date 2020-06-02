import {
    REQUEST_RECOMMENDED_COACHES_COMPLETED,
    REQUEST_RECOMMENDED_COACHES_FAILED,
    RESET_REDIRECT
} from "../action/coaches";


const coachesReducer = (state = {coaches: []}, action) => {
    switch (action.type) {
        case REQUEST_RECOMMENDED_COACHES_COMPLETED:
            return {...state, coaches: action.coaches, redirectToListRequired: true};
        case RESET_REDIRECT:
            return {...state, redirectToListRequired: false};
        case REQUEST_RECOMMENDED_COACHES_FAILED:
            return {...state, message: action.message.message, messageType: 'error'}
        default:
            return state;
    }
}

export default coachesReducer;