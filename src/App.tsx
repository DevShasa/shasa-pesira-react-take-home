import UsersDisplay from "./components/usersDisplay/UsersDisplay"
import Form from "./components/form/Form"
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks"
import { getUsers } from "./redux/dataSlices/userSlice"
import { useEffect } from "react"

function App() {


  const dispatch = useAppDispatch()
  const {users, isLoading, error:{errorPresent, errorMessage}} = useAppSelector((store)=> store.users)

  useEffect(()=>{
    dispatch(getUsers())
  }, [dispatch])
  
  return (
    <div className="main-app">
      <main>
        <UsersDisplay {...{users, isLoading, error:{errorMessage, errorPresent}}}/>
        <Form />
      </main>
    </div>
  )
}

export default App
