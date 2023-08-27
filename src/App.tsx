import UsersDisplay from "./components/usersDisplay/UsersDisplay"
import Form from "./components/form/Form"
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks"
import { getUsers, createUser, deleteUser } from "./redux/dataSlices/userSlice"
import { openModal } from "./redux/dataSlices/modalSlice"
import React, { useEffect, useState } from "react"
import type { CreateNewUser, Users } from "./types"
import { Toaster } from 'react-hot-toast'
import validate from "./utils/validateInputs"
import Modal from "./components/modal/Modal"

function App() {


  const dispatch = useAppDispatch()
  const {users, isLoading, error:{errorPresent, errorMessage}, newUserLoading} = useAppSelector((store)=> store.users)
  const {modalOpen} = useAppSelector((store)=> store.modal)
  const initialUserData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    street: ""
  }

  const [userData, setUserData] = useState<CreateNewUser>(initialUserData)
  const [errors, setErrors] = useState<CreateNewUser>(initialUserData)
  const [userToEdit, setUserToEdit] = useState<Users | null>(null)

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      setUserData({...userData, [e.target.name]: e.target.value})
  }

  

  const onCreateNewUser = (e:React.FormEvent)=>{
    e.preventDefault()
    setErrors(initialUserData)
    const checkErrors = validate(userData)

    if(checkErrors.error){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {error, ...inputErrors} = checkErrors
      setErrors(inputErrors)
    }else{
      setUserData(initialUserData)
      dispatch(createUser(userData))
    }
  }


  const onDeleteUser = (id:number)=>{
    dispatch(deleteUser(id))
  }


  const openTheModal = (id: number)=>{
    const userToChange = users.find(user => user.id === id) as Users
    setUserToEdit(userToChange)
    console.log("WE ARE CHANGING:::", userToChange)
    dispatch(openModal())
  }



  useEffect(()=>{
    dispatch(getUsers())
  }, [dispatch])
  
  return (
		<div className="main-app">
      {modalOpen && userToEdit && <Modal user={userToEdit}/>}
			<main>
				<UsersDisplay
					{...{users,
						isLoading,
						error: { errorMessage, errorPresent },
            deleteUser: onDeleteUser,
            openModal: openTheModal
					}}
				/>
				<Form
					name={userData.name}
					username={userData.username}
					email={userData.email}
					phone={userData.phone}
					company={userData.company}
					street={userData.street}
          submitAction={onCreateNewUser}
          onChange={onChange}
          formlabel="Create new User"
          errors = {errors}
          loading = {newUserLoading}
				/>  
			</main>
      <Toaster />
		</div>
  );
}

export default App
