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
}

function Team({statTeam}: PropsTeam) {

    const idTeam = statTeam.id;

    const team = useSelector((state: StateRoot)=> state.data.football.listTeam).find(team => team.id === idTeam);
    
    return (
        team ?
        <tr>
            <td>1</td>
            <td>{team.name}</td>
            <td>{statTeam.points}</td>
            <td>{statTeam.overall.games_played}</td>
            <td>{statTeam.overall.goals_diff}</td>
        </tr>
        : null
    );
}

Team.defaultProps = {};

export default Team;

