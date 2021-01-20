import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

//import Portal from './Football/Portal';

import styles from './Football.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsFootball = {};

function Football({}: PropsFootball) {
  
    const dispatch = useDispatch();     
    // const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    
    useEffect(()=>{
        dispatch(actions.data.football.return__GET_LEAGUE_STANDINGS({
            idLeague: '237'
        }));
    }, []);

    useEffect(()=>{
        dispatch(actions.data.football.return__GET_LIST_TEAM({
        }));
    }, []); 

    return (

        <div className={`${styles['root']}`} >

            <div className={`${styles['content']}`} >

                hello i'm football

            </div>

        </div>
    );
}

Football.defaultProps = {};

export default Football;

