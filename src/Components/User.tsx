
import { Reducer, useReducer, useState } from "react"
import { PatchUser, UserData } from "../CommonTypes/TypesList1"
import "../Styles/User.css"
import { Action } from "./UsersSection"
import { usePatchUser } from "./Apis"

type Props = {
    user : UserData
}

const reducer = (state : PatchUser , action : Action ) => {

    switch(action.type){

        case "name" : state.name = action.payload
                       return {...state}
        case "email" : state.email = action.payload
                       return {...state}
        case "gender" : state.email = action.payload
                       return {...state}
        case "status" : state.email = action.payload
                       return {...state}
        default : return {...state}
    }
}

export const User = ({user}:Props) =>{

    const [display, setDisplay] = useState <boolean> (false)
    const [userData, dispatch] = useReducer<Reducer<PatchUser,Action>>(reducer,{} as PatchUser)
    const mutation = usePatchUser()

    const patchUser = () => {
        mutation.mutate(userData)
        setDisplay(!display)
        userData.email = ""
        userData.name = ""
        userData.status = ""
    }

    return (
        <div className = "user" key = {Number(user.id)}>
            <button onClick = {() => setDisplay(!display)}>edit</button>

            <p>
                <span className = "user-name"> {user.name} </span>
                <span className = {`indicator ${user.status}`} >{user.status}</span>
            </p>
            <p> {user.gender} </p>
            <p> {user.email} </p>

            {display && 
            <div className = "user-modify-form">
            <input type = "text" name = "name" 
                onChange = { (e)=> dispatch({type : "name" , payload : e.target.value}) } 
                placeholder="enter name" required />
            <input type = "text" name = "email" 
                onChange = { (e)=> dispatch({type : "email" , payload : e.target.value}) } 
                placeholder="enter email" required />
            <input type = "radio" name = "gender" value = "male" 
                onClick = { (e)=> dispatch({type : "gender" , payload : e.currentTarget.value}) } 
                required /> male
            <input type = "radio" name = "gender" value = "female"
                onClick = { (e)=> dispatch({"type" : "gender" , payload : e.currentTarget.value}) } 
                required /> female
            <input type = "radio" name = "gender" value = "active" 
                onClick = { (e)=> dispatch({type : "status" , payload : e.currentTarget.value}) } 
                required /> active
            <input type = "radio" name = "gender" value = "inactive"
                onClick = { (e)=> dispatch({"type" : "status" , payload : e.currentTarget.value}) } 
                required /> inactive

            <button onClick = { patchUser }> Create</button>
            <button onClick = {() => setDisplay(!display)}> Cancel</button>
        </div>
            }

        </div>
    )
}