import React, { useMemo } from "react";


// idk how to set type of valueCurrent and value to be same
type PropsInputEmail = {

    name: string,
    value: any,

    label: string,
    placeholder: string,
    required: boolean,

    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
};

function InputEmail({

    name,
    value,

    label,
    placeholder,
    required,

    onChange,

}: PropsInputEmail) {

    const idInput = useMemo(()=>`input-email__${name}----${value}`,[]);
    const idLabel = useMemo(()=>`label__${name}----${value}`,[]);

    return ( 
    <>  
        <label 
            id={idLabel}
            htmlFor={idInput}
        >   {label} 
        </label>

        <input 
            type="email" 

            name={name} 
            value={value}

            id={idInput}
            aria-labelledby={idLabel}
            placeholder={placeholder}
            
            required={true}

            onChange={onChange} 
        /> 
    </>

  );
}

InputEmail.defaultProps = {};

export default InputEmail;


