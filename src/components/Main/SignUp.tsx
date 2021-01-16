import React, { useCallback, useEffect, useState } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import useInputBasic from 'tools/hooks/useInputBasic';
import useLink from 'tools/hooks/useLink'; 

import InputEmail from "components/Global/Input/InputEmail";
import InputPassword from "components/Global/Input/InputPassword";

import TopBar from './LogIn/TopBar';

//import IconLogIn from 'svgs/basic/IconLogIn';

import styles from './SignUp.module.scss';
import stylesLogIn from './LogIn.module.scss';

type PropsSignUp = {};

function SignUp({}: PropsSignUp) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);

    const listCodeSituationOthers:string[] = useSelector((state: StateRoot) => state['notification']['listCodeSituationOthers']);
    
    const {onClick_LinkInsideApp} = useLink(history);
    
    const {draft: draft_Main, onChange: onChange_Main} = useInputBasic({
        email: '',
        password1: '',
        password2: '',
    });

    const [codeSituationEmail, setCodeSituationEmail] = useState('');
    const [codeSituationPassword, setCodeSituationPassword] = useState('');
    
    useEffect(()=>{
        if (readyUser) {
            history.push('/');
        }
    },[readyUser, loadingUser]);

    useEffect(()=>{
        if(listCodeSituationOthers.includes('SignUp_NoEmail__E')){
            setCodeSituationEmail('SignUp_NoEmail__E');
            setCodeSituationPassword('');
        }
        else if(listCodeSituationOthers.includes('SignUp_InvalidEmail__E')){
            setCodeSituationEmail('SignUp_InvalidEmail__E');
            setCodeSituationPassword('');
        }
        else if(listCodeSituationOthers.includes('SignUp_DuplicateEmail__E')){
            setCodeSituationEmail('SignUp_DuplicateEmail__E');
            setCodeSituationPassword('');
        }
        else if (listCodeSituationOthers.includes('LogIn_NoPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('LogIn_NoPassword__E');
        }
        else if (listCodeSituationOthers.includes('SignUp_PasswordsDifferent__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('SignUp_PasswordsDifferent__E');
        }
        else if (listCodeSituationOthers.includes('SignUp_WeakPassword__E')) {
            setCodeSituationEmail('');
            setCodeSituationPassword('SignUp_WeakPassword__E');
        }
        else {
            setCodeSituationEmail('');
            setCodeSituationPassword('');
        }

    },[listCodeSituationOthers]);
  
  
    const submitMain = useCallback(
        () => {
            dispatch(actionsRoot.auth.return__SIGN_UP({
                email: draft_Main.email,
                password1: draft_Main.password1,
                password2: draft_Main.password2,
            }));
        },
        [draft_Main]
    );
    const onSubmit_Main = useCallback(
        (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            submitMain();
        }, 
        [draft_Main]
    );
    const onKeyPress_Main = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                submitMain();
            }
        },
        [draft_Main]
    );
  
  
  return (
    <div className={`${stylesLogIn['root']}`} >
        
        <TopBar />

        <form 
            className={`${stylesLogIn['content']}`} 
            onSubmit={onSubmit_Main}
        >  
                
            <div className={`${stylesLogIn['title-page']}`} >  
                <FormattedMessage id={`Main.SignUp_SignUp`} />
            </div>
            
            <div className={`${stylesLogIn['input-identity']}`} >
                <InputEmail 
                    name='email'
                    value={draft_Main.email}

                    label={intl.formatMessage({ id: 'Main.LogIn_EmailAddress'})}
                    placeholder={intl.formatMessage({ id: 'Main.LogIn_EmailAddress'})}
                    required={true}

                    onChange={onChange_Main}
                    onKeyPress={onKeyPress_Main}
                />
                <div> { codeSituationEmail &&  <FormattedMessage id={`Notification.${codeSituationEmail}`} />} </div>
            </div>
            
            
            <div className={`${stylesLogIn['input-password']}`} >
                <InputPassword 
                    name='password1'
                    value={draft_Main.password1}

                    label={intl.formatMessage({ id: 'Main.LogIn_Password'})}
                    placeholder={intl.formatMessage({ id: 'Main.LogIn_Password'})}
                    required={true}

                    onChange={onChange_Main}
                    onKeyPress={onKeyPress_Main}
                />
                <div> { codeSituationPassword &&  <FormattedMessage id={`Notification.${codeSituationPassword}`} />} </div>
            </div>
            
            <div className={`${stylesLogIn['input-password']}`} >
                <InputPassword 
                    name='password2'
                    value={draft_Main.password2}

                    label={intl.formatMessage({ id: 'Main.SignUp_PasswordAgain'})}
                    placeholder={intl.formatMessage({ id: 'Main.SignUp_PasswordAgain'})}
                    required={true}

                    onChange={onChange_Main}
                    onKeyPress={onKeyPress_Main}
                />
            </div> 
            
            
            
            <div className={`${stylesLogIn['button-enter']}`} >
                <input
                    type='submit'
                    value={intl.formatMessage({ id: 'Main.SignUp_SignUp'})}
                /> 
            </div>
            
            <nav className={`${stylesLogIn['collection-link']}`} > 
                <div> 
                    <a  
                        href='/'
                        onClick={onClick_LinkInsideApp}
                    > <FormattedMessage id={`Nav.Home`} /> </a>
                </div>
                <div> 
                    <a  
                        href='/log-in' 
                        onClick={onClick_LinkInsideApp}
                    > <FormattedMessage id={'Nav.LogIn'} /> </a>
                </div>
            </nav>
            
        </form>     
    </div>
  );
}

SignUp.defaultProps = {};

export default SignUp;
