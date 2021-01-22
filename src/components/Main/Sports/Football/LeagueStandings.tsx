import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import Team from './LeagueStandings/Team';

import * as actions  from 'store/actions';

//import Portal from './LeagueStandings/Portal';

import styles from './LeagueStandings.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsLeagueStandings = {
    mode: 'rows' | 'cards'; 
};

function LeagueStandings({mode}: PropsLeagueStandings) {

    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const listStatTeamSorted = useMemo(()=>{
        return ([...leagueStandings.listTeam] as actions.data.football.StatTeam[]).sort((statTeamA, statTeamB)=>statTeamA.position - statTeamB.position);
    }, []);

    const numberResultMax = useMemo(()=>{
        const listNumberWon = listStatTeamSorted.map((statTeamEach:actions.data.football.StatTeam)=>statTeamEach.overall.won);
        const listNumberDraw = listStatTeamSorted.map((statTeamEach:actions.data.football.StatTeam)=>statTeamEach.overall.draw);
        const listNumberLost = listStatTeamSorted.map((statTeamEach:actions.data.football.StatTeam)=>statTeamEach.overall.lost);
        return Math.max(...listNumberWon, ...listNumberDraw, ...listNumberLost)
    }, []);

    const numberGoalsMax = useMemo(()=>{
        const listNumberGoalsScored = listStatTeamSorted.map((statTeamEach:actions.data.football.StatTeam)=>statTeamEach.overall.goals_scored);
        const listNumberGoalsAgainst = listStatTeamSorted.map((statTeamEach:actions.data.football.StatTeam)=>statTeamEach.overall.goals_against);
        return Math.max(...listNumberGoalsScored, ...listNumberGoalsAgainst )
    }, []);

    return (

        <table className={`${styles['root']} mode----${mode}`} >

            <thead>
                <tr className={`${styles['row']}`} >
                    <th scope="col">
                        <span></span>
                        <span></span>
                    </th>
                    <th scope="col">
                        <span></span>
                        <span>Team</span>
                    </th>
                    <th scope="col">
                        <span>Pts</span>
                        <span>Points</span>
                    </th>
                    <th scope="col">
                        <span>Results</span>
                        <span>Results</span>
                    </th>
                    <th scope="col">
                        <span>Goal Diff</span>
                        <span>Goal Difference</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                {listStatTeamSorted.map( (statTeamEach:actions.data.football.StatTeam, index: number) => (
                    <Team 
                        statTeam={statTeamEach}
                        index={index}
                        numberResultMax={numberResultMax}
                        numberGoalsMax={numberGoalsMax}

                        key={`Team-${index}`}
                    />
                ))} 
            </tbody>

        </table>
    );
}

LeagueStandings.defaultProps = {};

export default LeagueStandings;

