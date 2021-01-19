import { call, select, put } from "redux-saga/effects";
import { firebaseFirestore } from "firebaseApp";

import axios from "axios";
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";


const requestGetListPortal = (idUser:string) => {
    
    return firebaseFirestore.collection("Portal_")
    .where("idUser", "==", idUser)
    .get()
};

// get first from my database
// if data (update date) is old, directly call SportdataAPI and get & upload to firebase
function* getLeagueStandings(action: actions.data.football.type__GET_LEAGUE_STANDINGS) {

    const {idLeague} = action.payload;

    try {
            
            const idUser: string =  yield select( (state:StateRoot) => state.auth.user?.id); 

            yield put( actions.status.return__REPLACE({
                listKey: ['ready', 'data', 'football', 'leagueStandings'],
                replacement: false
            }) );
            yield put( actions.status.return__REPLACE({
                listKey: ['loading', 'data', 'football', 'leagueStandings'],
                replacement: true
            }) );

            const data =  yield call( requestGetListPortal, idUser );
            
            const leagueStandings = data.docs[0];
            
            yield put( actions.data.return__REPLACE({
                listKey: ['football', 'leagueStandings'],
                replacement: leagueStandings
            }) );

            // trigger sorting of standings

    } catch (error) {
        
        console.log(error)

        yield put( actions.status.return__REPLACE({
            listKey: ['loading', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actions.status.return__REPLACE({
            listKey: ['ready', 'listPortal'],
            replacement: false
        }) );
        
        yield put( actions.notification.return__ADD_DELETE_BANNER({
            codeSituation: 'GetLeagueStandings_UnknownError__E'
        }) );
    }
}

export default getLeagueStandings;