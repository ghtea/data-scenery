import { call, spawn, put, takeEvery } from "redux-saga/effects";
import history from 'historyApp';

import axios from "axios";
import queryString from 'query-string';
import firebaseApp, { firebaseAuth } from "firebaseApp";

import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

// import * as config from 'config';
import * as actionsRoot from "store/actions";
 
//import * as actionsTheme from "../../actions/theme";




const requestLogInGithub = (provider:any) => {
    return firebaseAuth.signInWithPopup(provider)
};


function* logInGithub(action: actionsRoot.auth.type__LOG_IN_GITHUB) {
    try {

        const provider = new firebaseApp.auth.GithubAuthProvider();
        
        yield put( actionsRoot.notification.return__REPLACE({
            listKey: ['listCodeSituationOthers'],
            replacement: []
        }) );
        
            
            try {
                const {user} = yield call( requestLogInGithub, provider );
                //console.log(data.user);

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: true
                }) );

                yield put( actionsRoot.auth.return__REPLACE_USER({
                    user: user
                }) );

                history.push('/');
            } 
            catch (error){

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['ready', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.status.return__REPLACE({
                    listKey: ['loading', 'user'],
                    replacement: false
                }) );

                yield put( actionsRoot.auth.return__REPLACE_USER({
                    user: null
                }) );


                console.error(error);
                if (error.code === 'auth/account-exists-with-different-credential'){
                    console.log(error.message);
                    yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGithub_UnknownError__E'
                    }) );
                }
                else {
                    console.error(error);
                    yield put( actionsRoot.notification.return__ADD_DELETE_BANNER({
                        codeSituation: 'LogInGithub_UnknownError__E'
                    }) );
                }
                
                
            }
                

    // go to home
        
        
    } catch (error) {
        
        yield put( actionsRoot.status.return__REPLACE({
            listKey: ['ready', 'user'],
            replacement: false
        }) );

        yield put( actionsRoot.status.return__REPLACE({
            listKey: ['loading', 'user'],
            replacement: false
        }) );

        yield put( actionsRoot.auth.return__REPLACE_USER({
            user: null
        }) );

        console.error(error);
        console.error('logInGithub has been failed');
        
        yield put( actionsRoot.notification.return__ADD_CODE_SITUATION_OTHERS({
            codeSituation: 'LogInGithub_UnknownError__E'
        }) );
    }
}

export default logInGithub;
