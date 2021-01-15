import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

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
        className={`${styles['root']} on-small-devices ${isOpen && 'is-open'}`}
        aria-label="Main Navigation Board"
    > 
        hello! hellohellohellohellohellohello
    </nav> 
  );
}

NavBoard.defaultProps = {
    isOpen: false
};

export default NavBoard;
