import type { CreateNewUser } from "../../types";
import FormInput from "../input/FormInput";
import "./Form.css"
interface FormProps extends CreateNewUser {
	submitAction: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formlabel: string;
}

const Form = (props: FormProps) => {
	const { submitAction, onChange, formlabel } = props;

	return (
		<form onSubmit={submitAction} className="form_input_container">
			<h1>{formlabel}</h1>

			<FormInput
				value={props.name}
				label="Name"
				errorMsg="Name should be 3-16 characters and should not include any special characters"
				onChange={onChange}
				name="name"
				pattern="^[A-Za-z0-9]{3,16}$"
				placeholder="Name"
				type="text"
			/>
			<FormInput
				value={props.username}
				label="User Name"
				errorMsg="UserName should be 3-16 characters and should not include any special characters"
				onChange={onChange}
				name="username"
				pattern="^[A-Za-z0-9]{3,16}$"
				placeholder="User Name"
				type="text"
			/>
			<FormInput
				value={props.email}
        onChange={onChange}
				label="Email"
				errorMsg="Enter a valid email"
				name="email"
				placeholder="Email"
				type="email"
			/>
			<FormInput
				value={props.phone}
				onChange={onChange}
				name="phone"
				type="text"
				placeholder="Phone"
				errorMsg="Phone number is required and should only contain numbers"
				label="Phone"
				pattern="^[0-9]+$"
			/>

			<FormInput
				value={props.company}
				onChange={onChange}
				name="company"
				type="text"
				placeholder="Company"
				errorMsg="Company field should be more than five characters"
				label="Company"
				pattern="^[A-Za-z0-9 -]{5,}$"
			/>
			<FormInput
				value={props.street}
				onChange={onChange}
				name="street"
				type="text"
				placeholder="Street"
				errorMsg="Street field should be more than five characters"
				label="Street"
				pattern="^[A-Za-z0-9 -]{5,}$"
			/>
      <button type="submit">
        {formlabel}
      </button>
		</form>
	);
};

export default Form;
