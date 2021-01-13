import { call, spawn, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
//import * as config from '../../config';
import replaceUser from 'store/sagas/auth/replaceUser';

import signUp from 'store/sagas/auth/signUp';
import logIn from 'store/sagas/auth/logIn';
import logOut from 'store/sagas/auth/logOut';

import logInGoogle from 'store/sagas/auth/logInGoogle';
import logInGithub from 'store/sagas/auth/logInGithub';

import logCheckSucceeded from 'store/sagas/auth/logCheckSucceeded';
import logCheckFailed from 'store/sagas/auth/logCheckFailed';

import updateProfile from 'store/sagas/auth/updateProfile';


import * as actionsRoot from "store/actions";


export default function* sagaAuth() {
    yield takeLatest( actionsRoot.auth.name__REPLACE_USER, replaceUser ); 

    yield takeLatest( actionsRoot.auth.name__LOG_CHECK_SUCCEEDED, logCheckSucceeded ); 
    yield takeLatest( actionsRoot.auth.name__LOG_CHECK_FAILED, logCheckFailed ); 

    yield takeLatest( actionsRoot.auth.name__SIGN_UP, signUp ); 
    yield takeLatest( actionsRoot.auth.name__LOG_IN, logIn ); 
    yield takeLatest( actionsRoot.auth.name__LOG_OUT, logOut ); 

    yield takeLatest( actionsRoot.auth.name__LOG_IN_GOOGLE, logInGoogle ); 
    yield takeLatest( actionsRoot.auth.name__LOG_IN_GITHUB, logInGithub ); 

    yield takeLatest( actionsRoot.auth.name__UPDATE_PROFILE, updateProfile ); 
}

