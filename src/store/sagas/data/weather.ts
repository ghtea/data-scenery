import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";



import getWeather from 'store/sagas/data/weather/getWeather';


import * as actions from "store/actions";


export default function* sagaData() {
    yield takeEvery( actions.data.weather.name__GET_WEATHER_ONE, getWeather ); 
    // yield takeEvery( actions.data.football.name__UPDATE_LEAGUE_STANDINGS, updateLeagueStandings ); 
    
    // yield takeEvery( actions.data.football.name__GET_LIST_TEAM, getListTeam ); 
    // yield takeEvery( actions.data.football.name__ADD_TEAM, addTeam ); 
    // yield takeEvery( actions.data.football.name__CHECK_LIST_TEAM, checkListTeam ); 
}

