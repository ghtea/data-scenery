import React, { useCallback, useEffect, useState, useMemo } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actions from "store/actions";

import NavBar from './Header/NavBar';
import NavBoard from './Header/NavBoard';

import useLink from 'tools/hooks/useLink';

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

    const {onClick_LinkInsideApp} = useLink(history);
    
    useEffect(() => {
        // console.log(location.pathname);
        if (  (/^\/log-in/).test(location.pathname) || (/^\/sign-up/).test(location.pathname)  ) {
            dispatch(actions.status.return__REPLACE({
                listKey:['showing', 'header', 'root'],
                replacement: false
            }));
        }
        else {
            dispatch(actions.status.return__REPLACE({
                listKey:['showing', 'header', 'root'],
                replacement: true
            }));
        }
    }, [location]);

    const showingBoard = useSelector((state: StateRoot) => state.status.showing.header.board);
    const onClick_OpenBoard = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
            dispatch(actions.status.return__REPLACE({ 
                listKey: ['showing', 'header', 'board'],
                replacement: !showingBoard
            }));      
        },[showingBoard]
    );
    
    const onClick_ShowModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actions.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: true
        }));
        },[]
    );

  
  return (
    <header className={`${styles['root']} ${showingHeader && 'showing'}`}>

        <div className={`${styles['bar']}`}>

            <div className={`${styles['left']}`}>

                {!showingBoard ?
                <button
                    type='button'
                    aria-label="Open Board"
                    aria-haspopup="true"
                    onClick={onClick_OpenBoard}
                >   <IconThreeBars className={`${styles['icon__three-bars']}`} kind='light'/>
                </button>
                :
                <button
                    type='button'
                    aria-label="Close Board"
                    aria-haspopup="true"
                    onClick={onClick_OpenBoard}
                >   <IconX className={`${styles['icon__x']}`} kind='light'/>
                </button>
                }   

            </div>

            <div className={`${styles['left']} on-big-devices`}>

                <a 
                    className={`${styles['logo']}`} 
                    href='/'
                    onClick={onClick_LinkInsideApp}
                >
                    <div> <IconLogo className={`${styles['icon__logo']}`} kind='regular' /> </div>
                    <div className={`${styles['name']}`}> <FormattedMessage id={`Nav.NameApp`} /> </div>
                </a>

                <NavBar/>

            </div>


            {!readyUser && !loadingUser && 
                <div className={`${styles['right']}`}>
                    <a 
                        className={`button__main--light`} 
                        href='/log-in'
                        onClick={onClick_LinkInsideApp}
                    > 
                        <FormattedMessage id={'Nav.LogIn'}/> 
                    </a>
                    <a 
                        className={`button__main--solid`} 
                        href='/sign-up'
                        onClick={onClick_LinkInsideApp}
                    > 
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
                        aria-label="Open Profile"
                        value='myProfile'
                        onClick={onClick_ShowModal}
                    > 
                    {user?.photoURL ? 
                        <img className={`${styles['photo__profile']}`} src={user.photoURL} />
                        :
                        <IconUserCircle className={`${styles['icon__user-circle']}`} kind="solid"/>
                    }
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

        <NavBoard isOpen={showingBoard}/>

    </header>
  );
}

Header.defaultProps = {};

export default Header;
