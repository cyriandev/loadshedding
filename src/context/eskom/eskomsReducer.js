import {
    CLEAR_ERRORS,
    STATUS_LOADING,
    SCHEDULE_LOADING,
    SEARCH_LOADING,
    STATUS_ERROR,
    SCHEDULE_ERROR,
    SEARCH_ERROR,
    GET_STATUS,
    GET_RESULTS,
    GET_SCHEDULE,
    GET_STORATE_DATA,
    STORAGE_LOADING,
    SAVE_TO_STORATE,
    GET_TWEETS,
    TWEETS_ERROR,
    TWEETS_LOADING
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case STATUS_LOADING:
            return {
                ...state,
                status_loading: true
            }
        case TWEETS_LOADING:
            return {
                ...state,
                tweets_loading: true
            }
        case STORAGE_LOADING:
            return {
                ...state,
                storage_loading: true
            }
        case SEARCH_LOADING:
            return {
                ...state,
                search_loading: true
            }
        case SCHEDULE_LOADING:
            return {
                ...state,
                schedule_loading: true
            }
        case STATUS_ERROR:
            return {
                ...state,
                error: action.payload,
                status_loading: false
            }
        case SEARCH_ERROR:
            return {
                ...state,
                error: action.payload,
                search_loading: false
            }
        case SCHEDULE_ERROR:
            return {
                ...state,
                error: action.payload,
                schedule_loading: false
            }
        case TWEETS_ERROR:
            return {
                ...state,
                error: action.payload,
                tweets_loading: false
            }
        case GET_RESULTS:
            return {
                ...state,
                results: action.payload,
                search_loading: false
            }
        case GET_TWEETS:
            return {
                ...state,
                tweets: action.payload,
                tweets_loading: false
            }
        case GET_STATUS:
            return {
                ...state,
                status: action.payload,
                status_loading: false
            }
        case GET_SCHEDULE:
            return {
                ...state,
                schedule: action.payload,
                schedule_loading: false
            }
        case GET_STORATE_DATA:
            return {
                ...state,
                storage: action.payload,
                storage_loading: false
            }
        case SAVE_TO_STORATE:
            return {
                ...state,
                storage: action.payload,
                storage_loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}