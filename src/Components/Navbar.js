import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../api";

function Navbar({loggedInUser, setCurrentUser}) {
    const logoutUser= async ()=>{
        await logout();
        setCurrentUser(null);
    }
    
  return loggedInUser ? (
      <>
      <p>Welcome {loggedInUser.username}</p>
    <ul>
    <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/">
          <button onClick={logoutUser}>logout</button>
        </NavLink>
      </li>
      {/* <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/trips">
          Projects
        </NavLink>
      </li> */}
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/mytrips">
          My trips
        </NavLink>
      </li>
    </ul>
    </>
  ) : (
    <ul>
   
    <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/signup">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/login-google">
          Login with google
        </NavLink>
      </li>
  </ul>
  )
}
export default Navbar;