import React, { useReducer } from 'react';
import axios from 'axios';
import Cheerio from 'cheerio';
import * as SQLite from "expo-sqlite";
import EskomContext from './eskomsContext';
import EskomReducer from './eskomsReducer';
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
} from '../types';

const EskomState = ({ children }) => {
    const initialState = {
        schedule: [],
        status: null,
        results: [],
        error: null,
        schedule_loading: false,
        search_loading: false,
        status_loading: false,
    }
    const [state, dispatch] = useReducer(EskomReducer, initialState);
    const db = SQLite.openDatabase("eskom.db");

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

    // db.transaction((tx) => {
    //     tx.executeSql("SELECT * FROM suburbs", [], (_, { rows }) => {
    //         console.log(rows)
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS suburbs (id integer primary key not null, identifyer int, name text, province text, total int)", []);
    //         if (rows.length) {
    //             // tx.executeSql("DROP TABLE IF EXISTS suburbs");

    //         }
    //     }
    //     );
    // });

    const add = async (item) => {
        // db.transaction(
        //     (tx) => {
        //         tx.executeSql("INSERT INTO suburbs (identifyer, name, province, total) VALUES (?, ?, ?, ?)", [item.Id, item.Name, item.ProvinceName, item.Total]);
        //         tx.executeSql("SELECT * FROM suburbs", [], (_, { rows }) =>
        //             console.log(JSON.stringify(rows))
        //         );
        //     }
        // );
        console.log(item)
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



    // Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    })

    // Set Loading
    const setStatusLoading = () => dispatch({ type: STATUS_LOADING })
    const setSearchLoading = () => dispatch({ type: SEARCH_LOADING })
    const setScheduleLoading = () => dispatch({ type: SCHEDULE_LOADING })


    return <EskomContext.Provider
        value={{
            status: state.status,
            schedule: state.schedule,
            results: state.results,
            schedule_loading: state.schedule_loading,
            status_loading: state.status_loading,
            search_loading: state.search_loading,
            getStatus,
            getResults,
            getSchedule,
            add
        }}
    >
        {children}
    </EskomContext.Provider>
}

export default EskomState;

