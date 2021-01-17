import React, { useCallback, useEffect, useState, useMemo  } from "react";
import history from 'historyApp';
import { useLocation } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';
import * as actionsRoot from "store/actions";

import * as cn from 'tools/vanilla/convertName';
import nav, {Category as TypeCategory, Link} from 'components/Header/nav';
import useLink from 'tools/hooks/useLink';

// import styles from './Category.module.scss';

import IconAngle from 'svgs/basic/IconAngle';


type PropsCategory = TypeCategory & {
    idCategoryOpen: string | undefined;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}; 
 
function Category({
    id: idCategory, 
    listLink,

    idCategoryOpen, 
    onClick,
}: PropsCategory) {

    const {onClick_LinkInsideApp} = useLink(history);
    
    const idButton = useMemo(()=>`button__idCategory----${idCategory}`,[]);
    const idLabel = useMemo(()=>`label__idCategory----${idCategory}`,[]);
    
    const slugCategory = useMemo(()=>cn.camelToSlug(idCategory),[]);

    const transform: string = useMemo(()=>{
        if (idCategoryOpen === idCategory){
            return 'rotate(90)'
        }
        else {
            return 'rotate(270)'
        }
    },[idCategory, idCategoryOpen]);

    
    return (
        
        <li > 

            <button 
                type='button'
                value={idCategory}
                id={idButton}
                
                aria-labelledby={idLabel}
                aria-haspopup="menu" aria-expanded={idCategoryOpen === idCategory}
                onClick={onClick}
            >
                <label id={idLabel}> <FormattedMessage id={`Nav.${cn.camelToPascal(idCategory)}`} /> </label >
                <span>
                    <svg
                        width="1.3em"
                        height="1.3em"
                        style={{marginTop: '0.3em'}}
                        fill="currentColor"
                        className=""
                        aria-hidden="true"
                        focusable="false"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192 512"
                        transform={transform}
                    >
                        <path  fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z">
                        </path>
                    </svg>
                </span>
            </button>

            <ul 
                role="menu"    
                aria-labelledby={idLabel}
            >
                {listLink.map((linkEach, iEach)=>{
    
                    const slugLink = cn.camelToSlug(linkEach.id);
 
                    return (
                        <li 
                            role='menuitem'
                            key={`${idCategory}__link-${iEach}`}
                        >
                            <a 
                                href={`/${slugCategory}/${slugLink}`}
                                onClick={onClick_LinkInsideApp}
                            > 
                                <FormattedMessage id={`Nav.${cn.camelToPascal(idCategory)}_${cn.camelToPascal(linkEach.id)}`} /> 
                            </a>
                        </li>
                    )
                })}
            </ul>

        </li>
        
    );
}

 
export default Category;
 