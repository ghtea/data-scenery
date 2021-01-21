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



    return (

        <table className={`${styles['root']} mode----${mode}`} >

            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">team</th>
                    <th scope="col">points</th>
                    <th scope="col">games</th>
                    <th scope="col">goals</th>
                </tr>
            </thead>

            <tbody>
                {leagueStandings.listTeam.map( (statTeamEach:actions.data.football.StatTeam, index: number) => (
                    <Team statTeam={statTeamEach} key={`Team-${index}`}/>
                ))} 
            </tbody>

        </table>
    );
}

LeagueStandings.defaultProps = {};

export default LeagueStandings;

