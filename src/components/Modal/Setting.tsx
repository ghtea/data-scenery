import React, { useCallback, useEffect, useRef } from "react";
import { firebaseAuth } from "firebaseApp";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import {pascalToCamel} from 'tools/vanilla/convertName';
import IconX from 'svgs/basic/IconX';

import styles from './Setting.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsSetting = {};

function Setting({}: PropsSetting) {
  
    const dispatch = useDispatch();

    const languageCurrent:string = useSelector((state: StateRoot) => state['status']['current']['language']);
    const optionThemeCurrent:string = useSelector((state: StateRoot) => state['status']['current']['theme']['option']);
    
    const onClick_CloseModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actionsRoot.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: false
        }));
        },[]
    );
    
    const onClick_OutsideModal = useCallback(
        (event:React.MouseEvent<HTMLDivElement, MouseEvent>, idModal:string) => {
        dispatch(actionsRoot.status.return__REPLACE({ 
            listKey: ['showing', 'modal', idModal],
            replacement: false
        }));
        },[]
    );
  
  // ~ template
    const onChange_InputNormal = useCallback(
        (event:React.ChangeEvent<HTMLInputElement>) => {
            const {currentTarget : {name, value}} = event;
            if (name === 'optionTheme'){
                dispatch(actionsRoot.status.return__REPLACE({
                    listKey: ['current', 'theme', 'option'],
                    replacement: value
                }) );
                Cookies.set('optionTheme', value, { expires: 14});
            }
            else if (name === 'language'){
                dispatch(actionsRoot.status.return__REPLACE({
                    listKey: ['current', 'language'],
                    replacement: value
                }) );
            }
        },[]
    ); 

    const onClick_LogOut = useCallback(
        () => {
            dispatch(actionsRoot.auth.return__LOG_OUT());
        }, []
    );

  
  return (
    
    <div 
        className={`${styles['root']} ${stylesModal['root']}`} 
    >
    
        <div
            className={`${stylesModal['outside']}`}
            aria-label="Outside Setting"
            onClick={(event)=>onClick_OutsideModal(event, pascalToCamel("Setting") )}
        />

        <div 
            className={`${stylesModal['modal']}`}
            role="dialog" aria-labelledby="Heading_Setting"
        >
            <div className={`${stylesModal['header']}`} >
                <h2 id='Heading_Setting'>  <FormattedMessage id={`Modal.Setting_Title`} /> </h2>
                <button
                    type='button'
                    aria-label="Close Setting"
                    value={pascalToCamel("Setting")}
                    onClick={onClick_CloseModal}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </button>
            </div>
        
        
            <div className={`${stylesModal['content']}`} >
                <input/>
                <div className={`${stylesModal['content__section']}`} >
                    <h3> <FormattedMessage id={`Modal.Setting_Theme`} /> </h3>

                    <div className={'container__input-radio'} > 
                        <input 
                            type="radio" 
                            name="optionTheme" 
                            value="auto" defaultChecked={optionThemeCurrent==='auto'} id="optionTheme----auto"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----auto"> auto </label>

                        <input 
                            type="radio" 
                            name="optionTheme" 
                            value="always-light" defaultChecked={optionThemeCurrent==='always-light'} id="optionTheme----always-light"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----always-light"> light</label>

                        <input 
                            type="radio" 
                            name="optionTheme" 
                            value="always-dark" defaultChecked={optionThemeCurrent==='always-dark'} id="optionTheme----always-dark"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="optionTheme----always-dark"> dark </label>
                    </div>
                </div>
                
                <div className={`${stylesModal['content__section']}`} >
                    <h3>  <FormattedMessage id={`Modal.Setting_Language`} /></h3>
 
                    <div className={'container__input-radio'} > 
                        <input 
                            type="radio" 
                            name="language"  
                            value="en"  defaultChecked={languageCurrent==='en'} id="language----en"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="language----en"> English </label>

                        <input 
                            type="radio" 
                            name="language" 
                            value="ko" defaultChecked={languageCurrent==='ko'} id="language----ko"
                            onChange={onChange_InputNormal} 
                        /> <label htmlFor="language----ko"> 한국어 </label>

                    </div>

                </div>
                    
            </div>
        
        </div>
    </div>
    
  );
}

Setting.defaultProps = {};

export default Setting;


