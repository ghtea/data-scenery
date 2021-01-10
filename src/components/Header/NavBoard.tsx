import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsNotification from 'store/actions/notification';

import styles from './NavBoard.module.scss';


type PropsNavBoard = {
    isOpen:boolean;
};

function NavBoard({isOpen}: PropsNavBoard) {

    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);
    const user = useSelector((state: StateRoot) => state['auth']['user']);
    
  
  return (
    <nav 
        className={`${styles['root']} on-small-devices isOpen----${isOpen}`}
        aria-labelledby="Main Navigation"
    > 
        hello! hellohellohellohellohellohello
    </nav> 
  );
}

NavBoard.defaultProps = {};

export default NavBoard;
