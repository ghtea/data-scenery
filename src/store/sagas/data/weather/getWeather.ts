import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";
import * as types from "store/types";


const requestGetLeagueStandings = (idLeague:string) => {
    return firebaseFirestore.collection("Football.LeagueStandings_")
    .doc(idLeague)
    .get()
};


/*

https://openweathermap.org/api/one-call-api

https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=750bac5e554109ad1e24ce1c5e55351d

*/



function* getLeagueStandings(action: actions.data.football.type__GET_LEAGUE_STANDINGS) {

    const {idLeague} = action.payload;

    try {
            
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'football', 'leagueStandings'],
            replacement: false
        }) );
        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'football', 'leagueStandings'],
            replacement: true
        }) );

        const res =  yield call( requestGetLeagueStandings, idLeague );
        // console.log(res.data());

        const leagueStandings: types.data.football.LeagueStandings = res.data();

        const dateNow = Date.now();

        if (!leagueStandings){
            yield put( actions.data.football.return__UPDATE_LEAGUE_STANDINGS({
                idLeague: idLeague,
                triggeringGet: true,
            }) );
        }
        else {
            if (dateNow - leagueStandings['dateUpdated'] > 1000 * 60 * 60 * 3){  // if data is not old (in 3hours)

                yield put( actions.data.football.return__UPDATE_LEAGUE_STANDINGS({
                    idLeague: idLeague,
                    triggeringGet: true,
                }) );

            }
            else {   // if data is fresh
                yield put( actions.data.return__REPLACE({
                    listKey: ['football', 'leagueStandings'],
                    replacement: leagueStandings
                }) );

                yield put( actions.status.return__REPLACE({
                    listKey: ['loading', 'data', 'football', 'leagueStandings'],
                    replacement: false
                }) );
                
                yield put( actions.status.return__REPLACE({
                    listKey: ['ready', 'data', 'football', 'leagueStandings'],
                    replacement: true
                }) );

                const listIdTeamHere = Object.keys(leagueStandings.dictStatTeam);
                
                yield put( actions.data.football.return__CHECK_LIST_TEAM({
                    listIdTeam: listIdTeamHere,
                }) );
            }

        }
        

        // trigger sorting of standings

    } catch (error) {
        
        console.error(error)

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'data', 'football', 'leagueStandings'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'data', 'football', 'leagueStandings'],
            replacement: false
        }) );
        
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'Football_GetLeagueStandings_UnknownError__E'
        }) );
    }
}

export default getLeagueStandings;