import React, { useCallback, useEffect, useState } from "react";
import firebaseApp, { firebaseAuth } from 'firebaseApp';
import { useLocation } from "react-router-dom";
import history from 'historyApp';

import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as actionsAuth from 'store/actions/auth';
import * as actionsStatus from 'store/actions/status';

import useInputBasic from 'tools/hooks/useInputBasic';

//import IconLogIn from 'svgs/basic/IconLogIn';
import TopBar from './LogIn/TopBar';

import styles from './LogIn.module.scss';




type PropsLogIn = {};

function LogIn({}:PropsLogIn) {
  
    const dispatch = useDispatch();
    const intl = useIntl();
  
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

    // when login button is pushed, notification code of reaction is added to  this list, when login button is pushed again this list cleared once 
    const listCodeSituationOthers = useSelector((state: StateRoot) => state['notification']['listCodeSituationOthers']);

  
    const onClick_LinkInsideApp = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, destination:string) => {
        history.push(destination);
        },[history]
    );
    
    const {draft: draft_Main, onChange: onChange_Main} = useInputBasic({
        emailAddress: '',
        password: '' 
    });


    const [codeSituationEmail, setCodeSituationEmail] = useState('');
    const [codeSituationPassword, setCodeSituationPassword] = useState('');
  
    useEffect(()=>{
        if (readyUser) {
            history.push('/');
        }
    },[readyUser, loadingUser]);

    useEffect(()=>{
        if(listCodeSituationOthers.includes('LogIn_NoEmail__E')){
            setCodeSituationEmail('LogIn_NoEmail__E');
            setCodeSituationPassword('');
        }
        else if(listCodeSituationOthers.includes('LogIn_InvalidEmail__E')){
            setCodeSituationEmail('LogIn_InvalidEmail__E');
            setCodeSituationPassword('');
        }
        else if (listCodeSituationOthers.includes('LogIn_NoPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('LogIn_NoPassword__E');
        }
        else if (listCodeSituationOthers.includes('LogIn_WrongPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('LogIn_WrongPassword__E');
        }
        else {
            setCodeSituationEmail('');
            setCodeSituationPassword('');
        }
    },[listCodeSituationOthers])


    const submitMain = useCallback(
        () => {
            dispatch(actionsAuth.return__LOG_IN({
                email: draft_Main.emailAddress,
                password: draft_Main.password
            }));
        },
        [draft_Main]
    );
    const onSubmit_Main = useCallback(
        (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submitMain();
        },
        []
    );
    const onKeyPress_Main = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                submitMain();
            }
        },
        []
    );
    

    const onClick_LogInSocial = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const {currentTarget: {value}} = event;
            if (value === 'google'){
                dispatch(actionsAuth.return__LOG_IN_GOOGLE() );
            }
            else if (value === 'github'){
                dispatch(actionsAuth.return__LOG_IN_GITHUB() );
            }
        }, []
    );
  
  return (
    <div className={`${styles['root']}`} >

        <TopBar />

        <form 
            className={`${styles['content']}`} 
            onSubmit={onSubmit_Main}
        >

            <div className={`${styles['title-page']}`} > 
                <FormattedMessage id={`Main.LogIn_LogIn`} />
            </div>
                
            <div className={`${styles['input-identity']}`} >
                <div> <FormattedMessage id={`Main.LogIn_EmailAddress`} /> </div>
                <input 
                    type='email'
                    placeholder={intl.formatMessage({ id: 'Main.LogIn_EmailAddress'})}
                    name='emailAddress'
                    value={draft_Main.emailAddress}
                    required
                    onChange={onChange_Main} 
                    onKeyPress={onKeyPress_Main}
                /> 
                <div> { codeSituationEmail && <FormattedMessage id={`Notification.${codeSituationEmail}`} /> }  </div>
            </div> 
                
            <div className={`${styles['input-password']}`} >
                <div> <FormattedMessage id={`Main.LogIn_Password`} /> </div>
                <input 
                    type='password'
                    placeholder={intl.formatMessage({ id: 'Main.LogIn_Password'})}
                    name='password'
                    value={draft_Main.password}
                    required
                    onChange={onChange_Main}
                    onKeyPress={onKeyPress_Main}
                /> 
                <div> { codeSituationPassword && <FormattedMessage id={`Notification.${codeSituationPassword}`}/>} </div>
            </div> 

            
            <div className={`${styles['button-enter']}`} >
                <input
                    type='submit'
                    value={intl.formatMessage({ id: 'Main.LogIn_LogIn'})}
                />
            </div> 
            
        
            <div className={`${styles['division']}`} > 
                <div> or Log In with </div>
            </div> 
            
            <div className={`${styles['collection-social']}`} >
                <button 
                    type='button'
                    value='google'
                    onClick={onClick_LogInSocial}
                > Google </button>
                <button 
                    type='button'
                    value='github'
                    onClick={onClick_LogInSocial}
                > GitHub </button>
            </div> 
            
            <nav className={`${styles['collection-link']}`} >
                <div> 
                    <a  
                        href='/'
                    > <FormattedMessage id={`Nav.Home`} /> </a> 
                </div>
                <div> 
                    <a  
                        href='/sign-up'
                    > <FormattedMessage id={`Nav.SignUp`} /> </a> 
                </div>
            </nav> 

        </form>
    </div>
  );
}

LogIn.defaultProps = {};

export default LogIn;

