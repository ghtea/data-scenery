import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import { LineChart, Line, ResponsiveContainer,
    CartesianGrid,
    XAxis, YAxis,
    Tooltip, Legend,    
} from 'recharts';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';



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

            <div>I'm weather one</div> 

            <ResponsiveContainer width={700} height={300}>
                <LineChart 
                    width={730} height={250} 
                    data={weatherOne?.hourly}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                    <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

WeatherOne.defaultProps = {};
 
export default WeatherOne;

