import type { CreateNewUser } from "../../types";
import FormInput from "../input/FormInput";
import "./Form.css";
interface FormProps extends CreateNewUser {
	submitAction: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formlabel: string;
	errors:CreateNewUser
	loading:boolean
}

const Form = (props: FormProps) => {
	const { submitAction, onChange, formlabel, errors, loading } = props;

	return (
		<>
			<form onSubmit={submitAction} className="form_input_container">
				<h1>{formlabel}</h1>
				<FormInput
					value={props.name}
					label="Name"
					errorMsg={errors.name}
					onChange={onChange}
					name="name"
					placeholder="Name"
					type="text"
					loading={loading}
				/>
				<FormInput
					value={props.username}
					label="User Name"
					errorMsg={errors.username}
					onChange={onChange}
					name="username"
					placeholder="User Name"
					type="text"
					loading={loading}
				/>
				<FormInput
					value={props.email}
					onChange={onChange}
					label="Email"
					errorMsg={errors.email}
					name="email"
					placeholder="Email"
					type="email"
					loading={loading}
				/>
				<FormInput
					value={props.phone}
					onChange={onChange}
					name="phone"
					type="text"
					placeholder="Phone"
					errorMsg={errors.phone}
					label="Phone"
					loading={loading}
				/>

				<FormInput
					value={props.company}
					onChange={onChange}
					name="company"
					type="text"
					placeholder="Company"
					errorMsg={errors.company}
					label="Company"
					loading={loading}
				/>
				<FormInput
					value={props.street}
					onChange={onChange}
					name="street"
					type="text"
					placeholder="Street"
					errorMsg={errors.street}
					label="Street"
					loading={loading}
				/>
				<button disabled={loading} type="submit" className={`${loading ? "loading_state" :""}`}>{loading ?"..loading": formlabel}</button>
			</form>
		</>
	);
};

export default Form;
