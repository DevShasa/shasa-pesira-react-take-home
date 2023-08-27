import "./UserCard.css"
import Button from "../button/button"
import { useState } from "react"

type Props = {
    id: number
    name: string
    username: string
    email: string
    phone: string
    companyname: string
    street: string
    deleteUser: (id:number) => void
    openModal: (id:number) => void

}



const UserCard = (props: Props) => {
    const { id, name, username, email, phone, companyname, street, deleteUser, openModal } = props
    const [deleted, setDeleted] = useState(false)
    const onDelete = (id:number)=>{
        deleteUser(id)
        setDeleted(true)
    }
  return (
    <div className='card_main'>
        <div className='image_box'>
            <img src="person.webp"/>
        </div>
        <div className='details_box'>
            <div className='details'>
                <div className="details_info_card">
                    <span>Name</span>
                    <span>{name}</span>
                </div>
                <div className="details_info_card">
                    <span>User Name</span>
                    <span>{username}</span>
                </div>
                <div className="details_info_card">
                    <span>Email</span>
                    <span>{email}</span>
                </div>
                <div className="details_info_card">
                    <span>Phone</span>
                    <span>{phone}</span>
                </div>
                <div className="details_info_card">
                    <span>Company Name</span>
                    <span>{companyname}</span>
                </div>
                <div className="details_info_card">
                    <span>Street</span>
                    <span>{street}</span>
                </div>
            </div>
            <div className='buttons'>
                <Button callback={()=>openModal(id)} text="EDIT" color="#3535f1"/>
                <Button callback={()=> onDelete(id)} text={`${deleted ? "DELETING" : "DELETE"}`} color={`${deleted ? "#858585": "#df5555"}`}/>
            </div>
        </div>
    </div>
  )
}

export default UserCard