
import { UserData } from "../CommonTypes/TypesList1"
import "../Styles/User.css"

type Props = {

    user : UserData
}

export const User = ({user}:Props) =>{

    return (
        <div className = "user" key = {Number(user.id)}>
            <p>
                <span className = "user-name"> {user.name} </span>
                <span className = {`indicator ${user.status}`} >{user.status}</span>
            </p>
            <p>{user.gender}</p>
            <p>{user.email}</p>
        </div>
    )
}