import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import axios from 'axios';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import {} from '../LeagueStandings'
import * as actions  from 'store/actions';

//import Portal from './Team/Portal';

import styles from './Team.module.scss';
import stylesLS from '../LeagueStandings.module.scss';
import LeagueStandings from "../LeagueStandings";

 
// import IconSort from 'svgs/basic/IconSort';
type PropsTeam = {
    statTeam: actions.data.football.StatTeam;
    index: number;
    numberResultMax: number;
    numberGoalsMax: number;
}

function Team({
    statTeam, 
    index,
    numberResultMax,
    numberGoalsMax,
}: PropsTeam) {

    const idTeam = statTeam.id;

    const team = useSelector((state: StateRoot)=> state.data.football.listTeam).find(team => team.id === idTeam);
    
    const reward = useMemo(()=>{
        if (statTeam.result === 'Champions League'){
            return 'champions';
        }
        else if (statTeam.result === 'Europa League'){
            return 'europa';
        }
        else if (statTeam.result === 'Relegation'){
            return 'relegation';
        }
        else {
            return '';
        }
    },[statTeam]);

    const dictStyleResult = useMemo(()=>{
        let dictStyle: any = {};
        for (const result of ['won', 'draw', 'lost'] ){
            dictStyle[result]= {
                width: `${statTeam.overall[result as 'won'|'draw'|'lost'] / numberResultMax * 100}%`
            };
        }
        return dictStyle;
    },[statTeam, numberResultMax]);

    const dictStyleGoals = useMemo(()=>{
        let dictStyle: any = {};
        for (const result of ['goals_scored', 'goals_against' ] ){
            dictStyle[result]= {
                width: `${statTeam.overall[result as 'goals_scored'|'goals_against' ] / numberGoalsMax * 100}%`
            };
        }
        return dictStyle;
    },[statTeam, numberGoalsMax]);

    const diffGoal = useMemo(()=>{
        if (statTeam.overall.goals_diff > 0){
            return (`+${statTeam.overall.goals_diff.toString()}`);
        }
        else {
            return (`${statTeam.overall.goals_diff.toString()}`);
        }
    },[]);

    return (
        team ?
        <tr className={`${styles['root']} ${stylesLS['row']} reward----${reward}` }>

            <td className={`${styles['position']}`}> 
                {statTeam.position}
            </td>

            <td className={`${styles['team']}`}>
                <img className={`${styles['logo']}`} src={`${team.pathLogo}`}/>
                <span className={`${styles['name']}`}> {team.name} </span>
            </td> 
            
            <td className={`${styles['points']}`}>
                {statTeam.points}
            </td>
            
            <td className={`${styles['result']}`}>
                <span className={`${styles['graph']}`}>
                    <span className={`${styles['won']}`} style={dictStyleResult['won']} />
                    <span className={`${styles['draw']}`} style={dictStyleResult['draw']}/>
                    <span className={`${styles['lost']}`} style={dictStyleResult['lost']}/>
                </span>

                <span className={`${styles['text']}`}>
                    {`${statTeam.overall.won}/${statTeam.overall.draw}/${statTeam.overall.lost}`}
                </span>
            </td>
            
            <td className={`${styles['goals']}`}>
                <span className={`${styles['graph']}`}>
                    <span className={`${styles['scored']}`} style={dictStyleGoals['goals_scored']} />
                    <span className={`${styles['against']}`} style={dictStyleGoals['goals_against']}/>
                </span>

                <span className={`${styles['text']}`}>
                    {`${diffGoal}`}
                </span>
            </td>
        </tr>
        : null
    );
}

Team.defaultProps = {};

export default Team;

