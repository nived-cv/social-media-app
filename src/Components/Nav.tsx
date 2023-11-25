import { NavLink } from "react-router-dom";
import "../styles/Nav.css";

export const Nav = () => (
  <div className="Nav">
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/users">Users</NavLink>
  </div>
);
