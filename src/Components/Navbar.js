import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../api";

function Navbar({loggedInUser, setCurrentUser}) {
    const logoutUser= async ()=>{
        await logout();
        setCurrentUser(null);
    }
    
  return loggedInUser ? (
      <div className="container">
      <div className='row'>
        <div className='col-md-4'>
        <p>Welcome {loggedInUser.username}</p>
        </div>
     
     
  
   <div className='col-md-4'>
   
        <NavLink activeStyle={{ color: "red" }} exact to="/">
          <button onClick={logoutUser}>logout</button>
        </NavLink>
       
    
      </div>
      {/* <li>
        <NavLink activeStyle={{ color: "red" }} exact to="/trips">
          Projects
        </NavLink>
      </li> */}
      <div className="col-md-4">
      <NavLink activeStyle={{ color: "red" }} exact to="/mytrips">
          My trips
        </NavLink>
      </div>
      </div>
    
  
    </div>
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