import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";

import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
 
import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import {pascalToCamel} from 'tools/vanilla/convertName';
import useInput from 'tools/hooks/useInput';


import IconX from 'svgs/basic/IconX';

import styles from './MyProfile.module.scss';
import stylesModal from 'components/Modal.module.scss';


type PropsMyProfile = {};

function MyProfile({}: PropsMyProfile) {
  
    const dispatch = useDispatch();
    const intl = useIntl();

    const user = useSelector((state: StateRoot) => state['auth']['user']);

    const [urlPhotoLocal, setUrlPhotoLocal] = useState("");
    const [displayNameEditing, setTisplayNameEditing] = useState(user?.displayName);

    const onClick_CloseModal = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;
        dispatch(actionsRoot.status.return__REPLACE({ 
            listKey: ['showing', 'modal', value],
            replacement: false
        }));
        },[]
    );
    
    const refModal = useRef<HTMLDivElement>(null);
    const onClick_Window = useCallback(
        (event:MouseEvent)=> {   
            if ( !refModal.current?.contains(event.target as Node)){
                dispatch(actionsRoot.status.return__REPLACE({ 
                    listKey: ['showing', 'modal', pascalToCamel("MyProfile")],
                    replacement: false
                }));
            } 
        },[refModal]
    ); 
    useEffect(()=>{  // close sub menu when click outside of menu
        window.addEventListener('click', onClick_Window);
        return () => window.removeEventListener('click', onClick_Window);
    },[onClick_Window]);


    
    const onChange_InputFile = useCallback( (event:React.ChangeEvent<HTMLInputElement>) => {
        const { currentTarget: { files } } = event;
        const theFile = files && files[0];
        if (theFile){
            const reader = new FileReader();

            reader.onloadend = (finishedEvent) => {
                const result = finishedEvent?.target?.result || undefined;
                //const { currentTarget: { result }} = finishedEvent;
                setUrlPhotoLocal(result as string);
            };
            reader.readAsDataURL(theFile);  // then onloadend is triggered
        }
    },[]);
    const onClick_InputFile = useCallback( (event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.currentTarget.value = '';
    },[]);
    const onClick_ClearInputFile = useCallback( (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUrlPhotoLocal('');
    },[]);

    
    const onSubmit = useCallback( (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(actionsRoot.auth.return__UPDATE_PROFILE({
            urlPhotoLocal: urlPhotoLocal,
            displayName: displayNameEditing
        }));
    },[urlPhotoLocal, displayNameEditing]);

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
            aria-label="Outside MyProfile"
        />
 
        <div 
            className={`${stylesModal['modal']}`} 
            role="dialog" aria-labelledby="Heading_MyProfile"
            ref={refModal}
        >
            <div className={`${stylesModal['header']}`} >
                <h2 id='Heading_MyProfile'>  <FormattedMessage id={`Modal.MyProfile_Title`} /> </h2>
                <button 
                    type='button'
                    aria-label="Close MyProfile"
                    value={pascalToCamel("MyProfile")}
                    onClick={onClick_CloseModal}
                > 
                    <IconX className={`${stylesModal['icon-x']}`} />
                </button>
            </div>
        
            <form 
                className={`${stylesModal['content']}`} 
                onSubmit={onSubmit}
            >
                {urlPhotoLocal && (
                    <img  className={`${styles['photo-profile']}`} src={urlPhotoLocal} />
                )}
                
                <div className={`${stylesModal['content__section']}`} >
                    <h3>  <FormattedMessage id={`Modal.MyProfile_EmailAddress`} /></h3>
                    <span className={`${styles['email']}`}> {user?.email} </span>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <h3>  <FormattedMessage id={`Modal.MyProfile_Name`} /></h3>
                    <span className={`${styles['displayName']}`}> {user?.displayName} </span>
                </div>

                <div className={`${stylesModal['content__section']}`} >
                    <h3> <FormattedMessage id={`Modal.MyProfile_Photo`} /> </h3>

                    <div className={`container__input-file`} > 
                        <input type="file" accept="image/*" id='file-photo' 
                            onChange={onChange_InputFile} 
                            onClick={onClick_InputFile}
                        />
                        <label htmlFor='file-photo' > Upload Photo </label>
                        { urlPhotoLocal && <button onClick={onClick_ClearInputFile}> Clear </button> }
                    </div> 
                </div>
                
                {(urlPhotoLocal || displayNameEditing !== user?.displayName) &&
                    <div className={`${stylesModal['content__section']}`} >
                        <input
                            type="submit"
                            value={intl.formatMessage({ id: 'Modal.MyProfile_Update'})}
                        />
                    </div>
                }

                <div className={`${stylesModal['content__section']}`} >
                    <button
                        type='button'
                        value='log-out'
                        className={`${styles['button-log-out']}`}
                        onClick={()=>onClick_LogOut()}
                    > <FormattedMessage id={`Modal.Setting_LogOut`} /> </button>
                </div>

            </form>

            

        </div>

    </div>
  );
}

MyProfile.defaultProps = {};

export default MyProfile;




/*
{attachment && (
    <div>
        <img src={attachment} width="50px" height="50px" />
        <button onClick={onClick_ClearAttachment}>Clear</button>
    </div>
)}

*/