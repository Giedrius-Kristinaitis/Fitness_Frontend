import {config} from "../config";

export const REQUEST_RECOMMENDED_COACHES = 'REQUEST_RECOMMENDED_COACHES';
export const REQUEST_RECOMMENDED_COACHES_COMPLETED = 'REQUEST_RECOMMENDED_COACHES_COMPLETED';
export const REQUEST_RECOMMENDED_COACHES_FAILED = 'REQUEST_RECOMMENDED_COACHES_FAILED';
export const RESET_REDIRECT = 'RESET_REDIRECT';

export function resetCoachRedirect() {
    return {
        type: RESET_REDIRECT
    }
}

function requestRecommendedCoaches() {
    return {
        type: REQUEST_RECOMMENDED_COACHES,
    }
}

function requestRecommendedCoachesCompleted(json) {
    return {
        type: REQUEST_RECOMMENDED_COACHES_COMPLETED,
        coaches: json
    }
}

function requestRecommendedCoachesFailed(message) {
    return {
        type: REQUEST_RECOMMENDED_COACHES_FAILED,
        message
    }
}

export function getRecommendedCoaches(priceInterval) {
    console.log(JSON.stringify({min: +priceInterval.min, max: +priceInterval.max}));
    return dispatch => {
        dispatch(requestRecommendedCoaches());
        return fetch(`${config.BACKEND_URL}api/coaches/recomended`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({min: +priceInterval.min, max: +priceInterval.max})
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {throw new Error(text)});
                }
            })
            .then(json => dispatch(requestRecommendedCoachesCompleted(json)))
            .catch(e => dispatch(requestRecommendedCoachesFailed(e)));
    }
}