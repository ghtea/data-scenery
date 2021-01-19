import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";



import getLeagueStandings from 'store/sagas/data/football/getLeagueStandings';



import * as actions from "store/actions";


export default function* sagaData() {
    yield takeLatest( actions.data.football.name__GET_LEAGUE_STANDINGS, getLeagueStandings ); 
}

