
import { Reducer, useReducer, useState } from "react"
import { PatchUser, UserData } from "../CommonTypes/TypesList1"
import "../Styles/User.css"
import { Action } from "./UsersSection"
import { useDeleteUser, usePatchUser } from "./Apis"

type Props = {
    user: UserData
}

const reducer = (state: PatchUser, action: Action) => {

    switch (action.type) {

        case "name": state.name = action.payload
            return { ...state }
        case "email": state.email = action.payload
            return { ...state }
        case "gender": state.gender = action.payload as "male" || "female"
            return { ...state }
        case "status": state.status = action.payload
            return { ...state }
        default: return { ...state }
    }
}

export const User = ({ user }: Props) => {

    const initialValue = { id: user.id }
    const [display, setDisplay] = useState<boolean>(false)
    const [userData, dispatch] = useReducer<Reducer<PatchUser, Action>>(reducer, initialValue)
    const {mutateAsync: updateUser} = usePatchUser()
    const { mutateAsync: deleteUser } = useDeleteUser()

    const patchUser = () => {
        updateUser(userData)
        setDisplay(!display)
    }

    function handleDelete() {
        deleteUser(user.id)
    }

    return (
        <div className="user" key={Number(user.id)} >

            <p>
                <span className="user-name"> {user.name} </span>
                <span className={`indicator ${user.status}`} >{user.status}</span>
            </p>
            <p> {user.gender} </p>
            <p> {user.email} </p>
            <span className="spacer-container-min">
                <button className="btn" onClick={() => setDisplay(!display)}>edit</button>
                <button className="btn" onClick={handleDelete}>Delete</button>
            </span>

            {display &&
                <div className="user-modify-form">
                    <input type="text" name="name"
                        onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
                        placeholder="enter name" defaultValue={String(user.name)} required />
                    <input type="text" name="email"
                        onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
                        placeholder="enter email" defaultValue={String(user.email)} required />
                    <span>
                        <input type="radio" name="gender" value="male"
                            onClick={(e) => dispatch({ type: "gender", payload: e.currentTarget.value })}
                            required /> male
                        <input type="radio" name="gender" value="female"
                            onClick={(e) => dispatch({ "type": "gender", payload: e.currentTarget.value })}
                            required /> female
                    </span>
                    <span>
                        <input type="radio" name="status" value="active"
                            onClick={(e) => dispatch({ type: "status", payload: e.currentTarget.value })}
                            required /> active
                        <input type="radio" name="status" value="inactive"
                            onClick={(e) => dispatch({ "type": "status", payload: e.currentTarget.value })}
                            required /> inactive
                    </span>
                    <span style={{ display: "flex", columnGap: "10px" }}>
                        <button className="btn" onClick={patchUser}> Create</button>
                        <button className="btn" onClick={() => setDisplay(!display)}> Cancel</button>
                    </span>

                </div>
            }

        </div>
    )
}