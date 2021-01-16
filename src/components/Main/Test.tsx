import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";

import * as actionsRoot from "store/actions";

import styles from './Test.module.scss';



type PropsTest = {};

function Test({}: PropsTest) {
  
    const dispatch = useDispatch();     


    const onClick_AddTestingBanner = useCallback(
        (codeSituation:string) => {
        dispatch(actionsRoot.notification.return__ADD_DELETE_BANNER({
            codeSituation: codeSituation
        }) );
        }, []
    );
  
  return (

    <div className={`${styles['root']}`} >
        <div className={`${styles['content']}`} >

          <button
            onClick={event=>onClick_AddTestingBanner('Test1__S')}
          > test 1 
          </button>
          <button
            onClick={event=>onClick_AddTestingBanner('Test2__H')}
          > test 2 
          </button>

        </div>
    </div>
  );
}

Test.defaultProps = {};

export default Test;

