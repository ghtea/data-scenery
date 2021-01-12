import React, { useCallback, useEffect, useState } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsStatus from 'store/actions/status';
import * as actionsNotification from 'store/actions/notification';

import NavBar from './Header/NavBar';
import NavBoard from './Header/NavBoard';


import styles from './Header.module.scss';

import IconLogo from 'svgs/others/IconLogo';
import IconSearch from 'svgs/basic/IconSearch'; 

import IconThreeBars from 'svgs/basic/IconThreeBars';
import IconX from 'svgs/basic/IconX';

import IconSetting from 'svgs/basic/IconSetting';
import IconUserCircle from 'svgs/basic/IconUserCircle';


type PropsHeader = {};

function Header({}: PropsHeader) {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const showingHeader = useSelector((state: StateRoot) => state['status']['showing']['header']);
    
    const readyUser = useSelector((state: StateRoot) => state['status']['ready']['user']);
    const loadingUser = useSelector((state: StateRoot) => state['status']['loading']['user']);
    const user = useSelector((state: StateRoot) => state['auth']['user']);
    // useEffect(()=>console.log(user),[user])

    
    useEffect(() => {
        console.log(location.pathname);
        if (  (/^\/log-in/).test(location.pathname) || (/^\/sign-up/).test(location.pathname)  ) {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'header'],
                replacement: false
            }));
        }
        else {
            dispatch(actionsStatus.return__REPLACE({
                listKey:['showing', 'header'],
                replacement: true
            }));
        }
    }, [location]);

    const [isOpen, setIsOpen] = useState(false);
    const onClick_OpenBoard = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
            setIsOpen(!isOpen);        
        },[isOpen]
    );
    
    const onClick_ShowModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actionsStatus.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: true
        }));
        },[]
    );
  
  
  return (
    <header className={`${styles['root']} showing----${showingHeader}`}>

        <div className={`${styles['bar']}`}>

            <div className={`${styles['left']}`}>

                {!isOpen ?
                <button
                    type='button'
                    aria-label="Open Board"
                    onClick={onClick_OpenBoard}
                >   <IconThreeBars className={`${styles['icon__three-bars']}`} kind='light'/>
                </button>
                :
                <button
                    type='button'
                    aria-label="Close Board"
                    onClick={onClick_OpenBoard}
                >   <IconX className={`${styles['icon__x']}`} kind='light'/>
                </button>
                }   

            </div>

            <div className={`${styles['left']} on-big-devices`}>

                <a href='/' className={`${styles['logo']}`} >
                    <div> <IconLogo className={`${styles['icon__logo']}`} kind='regular' /> </div>
                    <div className={`${styles['name']}`}> <FormattedMessage id={`Nav.NameApp`} /> </div>
                </a>

                <NavBar/>

            </div>


            {!readyUser && !loadingUser && 
                <div className={`${styles['right']}`}>
                    <a className={`button__main--light on-big-devices`} href='/log-in'> 
                        <FormattedMessage id={'Nav.LogIn'}/> 
                    </a>
                    <a className={`button__main--solid on-big-devices`} href='/sign-up'> 
                        <FormattedMessage id={'Nav.SignUp'}/> 
                    </a>
                    <button
                        type='button'
                        aria-label="Open Setting"
                        value='setting'
                        onClick={onClick_ShowModal}
                    > <IconSetting className={`${styles['icon__setting']}`} kind='regular'/>  
                    </button>
                </div>
            }
            {readyUser &&  
                <div className={`${styles['right']}`}>
                    <button
                        type='button'
                    > <IconUserCircle className={`${styles['icon__user-circle']}`} kind='regular'/> 
                    </button>
                    <button
                        type='button'
                        aria-label="Open Setting"
                        value='setting'
                        onClick={onClick_ShowModal}
                    > <IconSetting className={`${styles['icon__setting']}`} kind='regular'/>  
                    </button>
                </div>
            }               


        </div> 

        <NavBoard isOpen={isOpen}/>

    </header>
  );
}

Header.defaultProps = {};

export default Header;
