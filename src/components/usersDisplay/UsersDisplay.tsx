import React from "react"
import Loading from "../loadingIndicator/LoadingIndicator"
import UserCard from "../userCard/UserCard"
import "./UsersDisplay.css"
import { Users } from "../../types"

interface Props{
  users: Users[],
  isLoading: boolean,
  error:{
    errorPresent :boolean
    errorMessage :string
  }
  deleteUser: (id:number) => void
  openModal: (id:number)=> void
}

const UsersDisplay = (props: Props) => {
  const {users, isLoading, error:{errorPresent, errorMessage}, deleteUser, openModal} = props
  return (
    <div className="users_main">
      {isLoading
        ? <Loading/>
        : errorPresent
        ? <p>{errorMessage}</p>
        : (<div className="users_main_cards_container">
            {users?.map((user)=>{
              return(
                <React.Fragment key={`${user.username} ${user.id}`}>
                  <UserCard 
                    id={user?.id}
                    name={user?.name}
                    email={user?.email}
                    username={user?.username}
                    companyname={user?.company?.name}
                    street={user?.address?.street}
                    phone={user?.phone}
                    deleteUser = {deleteUser}
                    openModal = {openModal}
                  />
                </React.Fragment>
              )
            })}
          </div>)
      }
    </div>
  )
}

export default UsersDisplay