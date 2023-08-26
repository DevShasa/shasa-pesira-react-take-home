import React, { useState } from "react";
import "./FormInput.css"
type Props = {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMsg: string;
    value: string
    name: string
    type: string
    pattern?:string;
    placeholder: string
};

const FormInput = (props: Props) => {
	const [focussed, setFocussed] = useState(false);
	const { label, onChange, errorMsg, value, name, type, placeholder, pattern } = props;

    const handleFocus = ()=>{
        setFocussed(true)
    }

	return (
		<div className="form_input">
            <label>{label}</label>
			<input 
                name={name}
                type={type}
                placeholder={placeholder}
                pattern={pattern}
                required
                onChange={onChange} 
                value={value}
                onBlur={handleFocus} // activate when user clicks away from input
                // @ts-expect-error we will access this custom attribute in css to display validation errors
                customDisplayError = {focussed.toString()} 
            />
            <span>{errorMsg}</span>
		</div>
	);
};

export default FormInput;
