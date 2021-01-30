import React, { useMemo, FunctionComponent  } from "react";

import IconChartBar from 'svgs/basic/IconChartBar';
import IconText from 'svgs/basic/IconText';




// idk how to set type of valueCurrent and value to be same
type PropsSwitch<T = string | number> = {
    valueCurrent: T,

    name: string,
    pairValue: [T, T],
    pairLabel: [string, string],
    pairIcon: [FunctionComponent, FunctionComponent]

    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
};

function Switch({
    valueCurrent,

    name,
    
    pairValue,
    pairLabel,
    pairIcon,

    onChange,

}: PropsSwitch) {

    const 

    
    const pairIdInput = useMemo(()=>[
        `input-radio__${name}----${pairValue[0]}`,
        `input-radio__${name}----${pairValue[1]}`,
        ]
    ,[]);

    const pairIdLabel = useMemo(()=>[
        `label__${name}----${pairValue[0]}`,
        `label__${name}----${pairValue[1]}`,
        ]
    ,[]);

    return ( 
    <>
        <input 
            type="radio" 

            name={name} 
            value={pairValue[0]}
            
            id={pairIdInput[0]}
            aria-labelledby={pairIdLabel[0]}
            defaultChecked={valueCurrent===pairValue[0]} 
            
            onChange={onChange} 
        /> 

        <label 
            id={pairIdLabel[0]}
            htmlFor={pairIdInput[0]}
            //label={pairLabel[0]}
        >   <IconChartBar/>
        </label>
    </>

  );
}

Switch.defaultProps = {};

export default Switch;


