import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import OptionSorting from './LeagueStandings/OptionSorting';
import Draggable from 'react-draggable'; 
// https://github.com/STRML/react-draggable

import Team from './LeagueStandings/Team';
import sortListStatTeam from './LeagueStandings/sortListStatTeam';

import * as actions  from 'store/actions';

//import Portal from './LeagueStandings/Portal';

import styles from './LeagueStandings.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsLeagueStandings = {
    mode: 'rows' | 'cards'; 
};

function LeagueStandings({mode}: PropsLeagueStandings) {

    const dispatch = useDispatch();
    const leagueStandings = useSelector((state: StateRoot)=>state.data.football.leagueStandings);

    const sorting = useSelector((state: StateRoot)=>state.status.current.football.leagueStandings.sorting);
    const [propertySortingDragging, setPropertySortingDragging] = useState<string | null>(null);
    const [propertySortingDraggedOver, setPropertySortingDraggedOver] = useState<string | null>(null);
    // https://medium.com/better-programming/create-a-sortable-list-with-draggable-items-using-javascript-9ef38f96b258
    
    useEffect(()=>{

    },[])

    const dictEventHandler = useMemo(()=>{
        return {
            onClick_Activate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                event.preventDefault();
                const value = event.currentTarget.value;
                const isActive = event.currentTarget.getAttribute('data-active');
                const index = sorting.listOptionActive.findIndex(option => option.property === value);
                if (index > -1){
                    dispatch(actions.status.return__REPLACE({
                        listKey: ['current', 'football', 'leagueStandings', 'sorting', 'listOptionActive', index, 'isActive'],
                        replacement: !isActive
                    }));
                }
            },
            onClick_ChangeDirection: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                event.preventDefault();
                const {value} = event.currentTarget;
                const index = sorting.listOptionActive.findIndex(option => option.property === value);
                if (index > -1){
                    dispatch(actions.status.return__REPLACE({
                        listKey: ['current', 'football', 'leagueStandings', 'sorting', 'listOptionActive', index, 'direction'],
                        replacement: sorting.listOptionActive[index].direction === 'ascending' ? 'descending': 'ascending'
                    }));
                }
            },
        }
    }, [sorting, propertySortingDragging, propertySortingDraggedOver ])
    

    const listStatTeamSorted = useMemo(()=>{
        let list: actions.data.football.StatTeam[] = [... (leagueStandings?.listStatTeam || [])];
        return sortListStatTeam(list, sorting.listOptionActive);
    }, [sorting, leagueStandings]);

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
        <div className={`${styles['root']}`}>

            <h2> League Standings </h2>

            <div className={`${styles['sorting']}`}>
                <div className={`${styles['active']}`}>
                    {sorting.listOptionActive.map(( (option, index)=>(
                        <OptionSorting
                            property={option.property}
                            direction={option.direction}
                            dictEventHandler={dictEventHandler}
                            active={true}

                            key={`OptionSortingActive-${index}`}
                        />
                    )))}
                </div>
                <div className={`${styles['others']}`}>
                    {sorting.listOptionAll.map(( (option, index)=>(
                        <OptionSorting
                            property={option.property}
                            direction={option.direction}
                            dictEventHandler={dictEventHandler}
                            active={false}

                            key={`OptionSortingDeactive-${index}`}
                        />
                    )))}
                </div>
            </div>

            <table className={`mode----${mode}`} aria-label='League Standings'>

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

        </div>
    );
}

LeagueStandings.defaultProps = {};

export default LeagueStandings;

