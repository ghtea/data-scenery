import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";



import getLeagueStandings from 'store/sagas/data/football/getLeagueStandings';


import * as actions from "store/actions";


export default function* sagaData() {
    yield takeEvery( actions.data.weather.name__GET_WEATHER, getLeagueStandings ); 
    // yield takeEvery( actions.data.football.name__UPDATE_LEAGUE_STANDINGS, updateLeagueStandings ); 
    
    // yield takeEvery( actions.data.football.name__GET_LIST_TEAM, getListTeam ); 
    // yield takeEvery( actions.data.football.name__ADD_TEAM, addTeam ); 
    // yield takeEvery( actions.data.football.name__CHECK_LIST_TEAM, checkListTeam ); 
}

