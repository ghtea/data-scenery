import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';


import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';


//import Team from './WeatherOne/Team';

import IconGraph from 'svgs/basic/IconChartBar';


import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './WeatherOne.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsWeatherOne = {
};

function WeatherOne({}: PropsWeatherOne) {

    const dispatch = useDispatch();
    const weatherOne = useSelector((state: StateRoot)=>state.data.weather.weatherOne);

    /*
    const onClick_ChangeMode = useCallback(
        (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {value} = event.currentTarget;

        dispatch(actions.status.return__REPLACE({ 
            listKey: ['current', 'weather', 'weatherOne', 'mode', 'element'],
            replacement: value
        }));
    
        },[]
    );
*/
    

    return (
        <div className={`${styles['root']}`}>

            <h2> Weather </h2>

            

        </div>
    );
}

WeatherOne.defaultProps = {};
 
export default WeatherOne;

