import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import OptionSorting from './LeagueStandings/OptionSorting';
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
    const dictEventHandler = useMemo(()=>{
        return {
            onDrag:(event: React.DragEvent<HTMLDivElement>)=>{
                event.preventDefault();
                setPropertySortingDragging(event.currentTarget.getAttribute('data-property'));
            },
            onDragOver:(event: React.DragEvent<HTMLDivElement>)=>{
                event.preventDefault();
                setPropertySortingDraggedOver(event.currentTarget.getAttribute('data-property'));
            },
            onDragLeave:(event: React.DragEvent<HTMLDivElement>)=>{
                event.preventDefault();
                setPropertySortingDraggedOver(null);
            },
            onDrop:(event: React.DragEvent<HTMLDivElement>)=>{
                event.preventDefault();
                const optionDragging = 
                    sorting.listOptionActive.find(option=>option.property===propertySortingDragging) || 
                    sorting.listOptionDeactive.find(option=>option.property===propertySortingDragging);
                
                const indexDraggedOver = sorting.listOptionActive.findIndex(option=>option.property===propertySortingDraggedOver);

                let listOptionActiveNew = [...sorting.listOptionActive];
                if (sorting.listOptionActive.length !== 1){
                    listOptionActiveNew = listOptionActiveNew.filter(option=>option.property !== propertySortingDragging);
                }
                if (indexDraggedOver > -1 && optionDragging ){
                    listOptionActiveNew.splice(indexDraggedOver, 0, optionDragging);
                };   
                setPropertySortingDragging(null);
                dispatch(actions.status.return__REPLACE({
                    listKey:['current', 'football', 'leagueStandings', 'sorting', 'listOptionActive'], 
                    replacement: listOptionActiveNew
                }));

                const listPropertyActiveNew = listOptionActiveNew.map(option=>option.property);
                const listOptionDeactiveNew = sorting.listOptionAll.filter(option=> !listPropertyActiveNew.includes(option.property) )
                dispatch(actions.status.return__REPLACE({
                    listKey:['current', 'football', 'leagueStandings', 'sorting', 'listOptionDeactive'], 
                    replacement: listOptionDeactiveNew
                }));
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
                    {sorting.listOptionDeactive.map(( (option, index)=>(
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

