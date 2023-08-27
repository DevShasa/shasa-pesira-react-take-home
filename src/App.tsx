import UsersDisplay from "./components/usersDisplay/UsersDisplay"
import Form from "./components/form/Form"
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks"
import { getUsers, createUser } from "./redux/dataSlices/userSlice"
import React, { useEffect, useState } from "react"
import type { CreateNewUser } from "./types"

function App() {


  const dispatch = useAppDispatch()
  const {users, isLoading, error:{errorPresent, errorMessage}} = useAppSelector((store)=> store.users)

  const [userData, setUserData] = useState<CreateNewUser>({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
    street: ""
  })

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      setUserData({...userData, [e.target.name]: e.target.value})
  }

  const onCreateNewUser = (e:React.FormEvent)=>{
    e.preventDefault()
    console.log("NEW DATA::", userData)
    //dispatch(createUser(userData))
  }

  useEffect(()=>{
    dispatch(getUsers())
  }, [dispatch])
  
  return (
		<div className="main-app">
			<main>
				<UsersDisplay
					{...{
						users,
						isLoading,
						error: { errorMessage, errorPresent },
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
				/>  
			</main>
		</div>
  );
}

export default App
