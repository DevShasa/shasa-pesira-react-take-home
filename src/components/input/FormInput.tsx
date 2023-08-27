import React from "react";
import "./FormInput.css"
type Props = {
	label: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMsg: string;
    value: string
    name: string
    type: string
    placeholder: string
    loading: boolean
};

const FormInput = (props: Props) => {
	const { label, onChange, errorMsg, value, name, type, placeholder, loading  } = props;

	return (
		<div className="form_input">
            <label>{label}</label>
			<input 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange} 
                value={value}
                className={`${errorMsg.length !== 0 ? "inputError": loading ? "loading_state":""}`}

            />
            {errorMsg.length !== 0 && <span>{errorMsg}</span>}
		</div>
	);
};

export default FormInput;
