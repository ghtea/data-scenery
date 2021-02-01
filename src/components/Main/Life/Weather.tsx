import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


import * as actions  from 'store/actions';

import Loading from 'components/Global/Loading';
// import LeagueStandings from './Weather/LeagueStandings';

import styles from './Weather.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsWeather = {};

function Weather({}: PropsWeather) {
  
    const dispatch = useDispatch();     
    
    const readyLeagueStandings = useSelector((state: StateRoot) => state.status.ready.data.football.leagueStandings);
    const loadingLeagueStandings = useSelector((state: StateRoot) => state.status.loading.data.football.leagueStandings);

    useEffect(()=>{
        dispatch(actions.data.weather.return__GET_WEATHER({
        })); 
    }, []);


    return (

        <div className={`${styles['root']}`} >
            

        </div>
    );
}

Weather.defaultProps = {}; 

export default Weather;


/*


            {readyLeagueStandings &&
                <LeagueStandings />
            }

            {!readyLeagueStandings && loadingLeagueStandings &&
                <Loading />
            }
*/
