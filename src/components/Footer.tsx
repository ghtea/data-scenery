import React, { useCallback, useEffect } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsNotification from 'store/actions/notification';

import styles from './Footer.module.scss';

import IconLogo from 'svgs/others/IconLogo';
import IconSearch from 'svgs/basic/IconSearch'; 
import IconPlus from 'svgs/basic/IconPlus';

import IconSetting from 'svgs/basic/IconSetting';
import IconUserCircle from 'svgs/basic/IconUserCircle';


type PropsFooter = {};

function Footer({}: PropsFooter) {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const showingFooter = useSelector((state: StateRoot) => state['status']['showing']['footer']);
    
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);
    const user = useSelector((state: StateRoot) => state['auth']['user']);
    // useEffect(()=>console.log(user),[user])

    useEffect(() => {
        console.log(location.pathname);
        if (  (/^\/log-in/).test(location.pathname) || (/^\/sign-up/).test(location.pathname)  ) {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'footer'],
                replacement: false
            }));
        }
        else {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'footer'],
                replacement: true
            }));
        }
    }, [location]);


    // event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, 
    const onClick_LinkInsideApp = useCallback(
        (destination:string) => {
        history.push(destination);
        },[history]
    );
    
    const onClick_ShowModal = useCallback(
        (idModal:string) => {
        dispatch(actionsStatus.return__REPLACE({ 
            listKey: ['showing', 'modal', idModal],
            replacement: true
        }));
        },[]
    );
  
  
  return (
    <footer className={`${styles['root']} showing----${showingFooter}`}>
        <div> ⓒ 2016. nextwing.me All Rights Reserved. </div> 
    </footer>
  );
}

Footer.defaultProps = {};

export default Footer;
