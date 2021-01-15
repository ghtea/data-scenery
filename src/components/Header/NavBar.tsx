import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import styles from './NavBar.module.scss';

import IconAngle from 'svgs/basic/IconAngle';


type PropsNavBar = {};

function NavBar({}: PropsNavBar) {

    const [idCategoryOpen, setIdCategoryOpen] = useState<undefined | string>(undefined);

    const onClick_Category = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const {currentTarget: {value : idCategoryClicked}} = event;
            setIdCategoryOpen(idCategoryClicked);
        },[idCategoryOpen]
    );
  
  return (
    <nav 
        className={`${styles['root']} `}
        aria-label="Main Navigation Bar"
    >
        <ul 
            className={`${styles['all']}`}
            aria-labelledby={'button__categoryA'}
        >
            <li>
                <button 
                    type='button'
                    id={`button__${'categoryA'}`}
                    aria-haspopup="menu" aria-expanded={idCategoryOpen === 'categoryA'}
                    onClick={onClick_Category}
                >
                    <span> sports </span>
                    <div className={`${styles['container__icon']}`}> <IconAngle className={`${styles['icon__angle']}`} directon='down' kind='light' /> </div>
                </button>
                <ul 
                    className={`${styles['dropdown']}`}
                    role="menu"    
                    aria-labelledby="button__categoryA"
                >
                    <li role='menuitem'><a href='/sports/football'>football</a></li>
                </ul>
            </li>
        </ul>
        
    </nav>

  );
}

NavBar.defaultProps = {};

export default NavBar;
