import React, { useReducer } from 'react';
import axios from 'axios';
import Cheerio from 'cheerio';
import EskomContext from './eskomsContext';
import EskomReducer from './eskomsReducer';
import {
    CLEAR_ERRORS,
    STATUS_LOADING,
    SCHEDULE_LOADING,
    SEARCH_LOADING,
    STORAGE_LOADING,
    STATUS_ERROR,
    SCHEDULE_ERROR,
    SEARCH_ERROR,
    GET_STATUS,
    GET_RESULTS,
    GET_SCHEDULE,
    GET_STORATE_DATA,
    SAVE_TO_STORATE,
    GET_TWEETS,
    TWEETS_ERROR,
    TWEETS_LOADING
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const EskomState = ({ children }) => {
    const initialState = {
        schedule: [],
        status: null,
        results: [],
        storage: [],
        tweets: [],
        error: null,
        schedule_loading: false,
        search_loading: false,
        status_loading: false,
        storage_loading: false,
        tweets_loading: false
    }
    const [state, dispatch] = useReducer(EskomReducer, initialState);

    // Get Status
    const getStatus = async () => {

        setStatusLoading();
        try {
            const res = await axios.get(`https://loadshedding.eskom.co.za/LoadShedding/GetStatus`);
            dispatch({
                type: GET_STATUS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: STATUS_ERROR,
                payload: (err.response || {}).data
            })
            setTimeout(() => clearErrors(), 5000);
        }
    }


    const add = async (items) => {
        setStorageLoading();
        try {
            await AsyncStorage.setItem('@suburbs', JSON.stringify(items))
            dispatch({
                type: SAVE_TO_STORATE,
                payload: items
            })
        } catch (e) {
            Alert(e);
        }
    }

    const getStorageData = async () => {
        setStorageLoading();
        try {
            const data = await AsyncStorage.getItem('@suburbs')
            dispatch({
                type: GET_STORATE_DATA,
                payload: JSON.parse(data)
            })
        } catch (e) {
            Alert(e);
        }
    }


    // Get Search results
    const getResults = async (term) => {
        if (term.length >= 3) {
            setSearchLoading();
            try {
                const res = await axios.get(`https://loadshedding.eskom.co.za/LoadShedding/FindSuburbs?searchText=${term}&maxResults=20`);
                dispatch({
                    type: GET_RESULTS,
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: SEARCH_ERROR,
                    payload: (err.response || {}).data
                })
                setTimeout(() => clearErrors(), 5000);
            }
        }
    }

    // Get Schedule
    const getSchedule = async (info) => {
        let data = [];
        setScheduleLoading();
        try {
            const res = await fetch(`https://loadshedding.eskom.co.za/LoadShedding/GetScheduleM/${info.id}/${info.stage}/${info.province}/${info.total}`);
            const htmlString = await res.text();
            const $ = Cheerio.load(htmlString);
            $('.scheduleDay').map((index, item) => {
                data = [...data, {
                    date: $('.dayMonth', item).text().trim(),
                    times: $('a', item).text()
                }]
            })
            dispatch({
                type: GET_SCHEDULE,
                payload: data
            })
        } catch (err) {
            dispatch({
                type: SCHEDULE_ERROR,
                payload: (err.response || {}).data
            })
            setTimeout(() => clearErrors(), 5000);
        }

    }



    const getTweets = async () => {
        setTweetsLoading();
        try {
            const res = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=from:Eskom_SA&max_results=20&tweet.fields=created_at&expansions=author_id&user.fields=description', {
                headers: {
                    'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAAC0IQAEAAAAA30xp8x%2FTWc2hqpn%2Fh70a%2BgkXwhM%3D460zL1Eo0vujT9ukvgSUfVJuEvNI31gCjTkPoz67TsPMwaqhmS`
                }

            });

            dispatch({
                type: GET_TWEETS,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: TWEETS_ERROR,
                payload: (err.response || {}).data
            })
            setTimeout(() => clearErrors(), 5000);
        }
    }


    // Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    })

    // Set Loading
    const setStatusLoading = () => dispatch({ type: STATUS_LOADING })
    const setSearchLoading = () => dispatch({ type: SEARCH_LOADING })
    const setScheduleLoading = () => dispatch({ type: SCHEDULE_LOADING })
    const setStorageLoading = () => dispatch({ type: STORAGE_LOADING })
    const setTweetsLoading = () => dispatch({ type: TWEETS_LOADING })


    return <EskomContext.Provider
        value={{
            status: state.status,
            schedule: state.schedule,
            results: state.results,
            storage: state.storage,
            tweets: state.tweets,
            schedule_loading: state.schedule_loading,
            status_loading: state.status_loading,
            search_loading: state.search_loading,
            tweets_loading: state.tweets_loading,
            getStatus,
            getResults,
            getSchedule,
            add,
            getStorageData,
            getTweets
        }}
    >
        {children}
    </EskomContext.Provider>
}

export default EskomState;

