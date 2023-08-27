import React, { useState } from "react";
import type { CreateNewUser, Users } from "../../types";
import { closeModal } from "../../redux/dataSlices/modalSlice";
import validate from "../../utils/validateInputs";
import Form from "../form/Form";
import { useAppDispatch } from "../../hooks/storeHooks";

const initialUserData = {
	name: "",
	username: "",
	email: "",
	phone: "",
	company: "",
	street: "",
};

type Props = {
	user: Users;
};

const Modal = (props: Props) => {
    const dispatch = useAppDispatch()
	const { user } = props;
	const [userData, setUserData] = useState<CreateNewUser>({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        company: user.company.name,
        street: user.address.street,
    });
	const [errors, setErrors] = useState<CreateNewUser>(initialUserData);

    const closeTheModal = ()=>{
        dispatch(closeModal())
    }

	const editUser = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(initialUserData);
		const checkErrors = validate(userData);

		if (checkErrors.error) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { error, ...inputErrors } = checkErrors;
			setErrors(inputErrors);
		}else{
            // pass data to thunk
            setUserData(initialUserData)
        }
	};

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }

	return (
        <div className="modal_container">
            <div className="modal_form">
                <button className="close_modal_sign" onClick={closeTheModal}>CLOSE</button>
                <Form 
                    name={userData.name}
                    username={userData.username}
                    email={userData.email}
                    phone={userData.phone}
                    company={userData.company}
                    street={userData.street}
                    submitAction={editUser}
                    onChange={onChange}
                    formlabel="Create new User"
                    errors = {errors}
                    loading= {true}
                />
            </div>
        </div>
    )
};

export default Modal;
