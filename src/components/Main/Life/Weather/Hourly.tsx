import React, { useCallback, useEffect, useMemo, useState } from "react";
import history from 'historyApp';

import { FormattedMessage } from 'react-intl';
import { LineChart, Line, ResponsiveContainer,
    CartesianGrid,
    XAxis, YAxis, ReferenceLine, ReferenceArea,
    Tooltip, Legend,    
} from 'recharts';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import returnListNight from './Hourly/returnListNight';

import IconGraph from 'svgs/basic/IconChartBar';


import * as actions  from 'store/actions';
import * as types  from 'store/types';

import styles from './Hourly.module.scss';
// import IconSort from 'svgs/basic/IconSort';
type PropsHourly = {
};

function Hourly({}: PropsHourly) {

    const dispatch = useDispatch();
    const weatherOne = useSelector((state: StateRoot)=>state.data.weather.weatherOne);

    const listIndex = useMemo(()=>{
        return weatherOne?.hourly.filter(e=>e.hour === 0).map((e)=>e.index);        
    },[weatherOne]);

    const listNight = useMemo( ()=> weatherOne ? returnListNight(weatherOne) : [] ,[weatherOne] );

    console.log(listNight);
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

            <h2> Hourly </h2>

            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart 
                    width={730} height={250} 
                    data={weatherOne?.hourly}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    
                    
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ReferenceLine y={0} stroke="grey" strokeDasharray="6 6"/>
                    {listIndex?.map(index=>(
                        <ReferenceLine x={index} stroke="grey" key={`ref line ${index}`}/>
                    ))}

                    {listNight?.map((night, index)=>(
                        <ReferenceArea x1={night.indexStart} x2={night.indexEnd} key={`ref area night ${index}`}/>
                    ))}
                    
                    <Tooltip 
                        contentStyle={{width: 'auto'}}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="temp" name="real temp" stroke="#8884d8" strokeWidth={2}/>
                    <Line type="monotone" dataKey="feels_like" name="feels like" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

Hourly.defaultProps = {};
 
export default Hourly;

