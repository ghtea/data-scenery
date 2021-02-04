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

    console.log(listIndex)
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

            <ResponsiveContainer width={700} height={300}>
                <LineChart 
                    width={730} height={250} 
                    data={weatherOne?.hourly}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ReferenceLine y={0} stroke="grey" strokeDasharray="6 6"/>
                    {listIndex?.map(index=>(
                        <ReferenceLine x={index} stroke="grey" key={`ref line ${index}`}/>
                    ))}
                    <ReferenceArea x1={0} x2={4} y1={-3} y2={3} stroke="red" strokeOpacity={0.3} />
                    
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

