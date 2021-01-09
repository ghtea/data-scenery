import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsNotification from 'store/actions/notification';

import styles from './NavBar.module.scss';

import IconAngle from 'svgs/basic/IconAngle';


type PropsNavBar = {};

function NavBar({}: PropsNavBar) {
  
  return (
    <nav className={`${styles['root']} `}>
        <ul className={`${styles['all']}`}>
            <li>
                <a className={`${styles['category']}`}>
                    <div className={`${styles['text']}`}> sports </div>
                    <div className={`${styles['container__icon']}`}> <IconAngle className={`${styles['icon__angle']}`} directon='down' kind='light' /> </div>
                </a>
                <ul className={`${styles['dropdown']}`}>
                    <li><a href='/sports/football'>football</a></li>
                </ul>
            </li>
        </ul>
        
    </nav>

  );
}

NavBar.defaultProps = {};

export default NavBar;
