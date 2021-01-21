import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

//import Portal from './Team/Portal';

import styles from './Team.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsTeam = {
    statTeam: actions.data.football.StatTeam;
    index: number;
}

function Team({
    statTeam, 
    index}: PropsTeam
) {

    const idTeam = statTeam.id;

    const team = useSelector((state: StateRoot)=> state.data.football.listTeam).find(team => team.id === idTeam);
    
    return (
        team ?
        <tr className={`${styles['root']}`}>
            <td>
                {index+1}
            </td>

            <td>
                <div className={`${styles['container']}`}>
                    <img className={`${styles['logo']}`} src={`${team.pathLogo}`}/>
                    <span className={`${styles['code']}`}> {team.code} </span>
                    <span className={`${styles['name']}`}> {team.name} </span>
                </div>
            </td> 
            
            <td>
                {statTeam.points}
            </td>
            
            <td>
                {statTeam.overall.games_played}
            </td>
            
            <td>
                {statTeam.overall.goals_diff}
            </td>
        </tr>
        : null
    );
}

Team.defaultProps = {};

export default Team;

