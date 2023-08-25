import "./UserCard.css"
import Button from "../button/button"

type Props = {
    id: number
    name: string
    username: string
    email: string
    phone: string
    companyname: string
    street: string
}



const UserCard = (props: Props) => {
    const { id, name, username, email, phone, companyname, street } = props

    const onDelete = (id:number)=>{
        console.log(`Deleting ${id}`)
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
                <Button callback={()=>{}} text="EDIT" color="#3535f1"/>
                <Button callback={()=> onDelete(id)} text="DELETE" color="#df5555"/>
            </div>
        </div>
    </div>
  )
}

export default UserCard