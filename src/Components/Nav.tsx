
import { NavLink } from "react-router-dom"
import "../Styles/Nav.css"

export const Nav = () =>{

    return <div className = "Nav">
        
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home">About</NavLink>
        <NavLink to="/users">Users</NavLink>
    </div>
}