import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../api';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
function Navbar({ loggedInUser, setCurrentUser }) {
  const logoutUser = async () => {
    await logout();
    setCurrentUser(null);
  };

  return loggedInUser ? (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Welcome {loggedInUser.username}{' '}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <div>
              <NavLink activeStyle={{ color: 'red' }} exact to="/" activeClassName="activeClicked">
                <button onClick={logoutUser}>logout</button>
              </NavLink>
            </div>

            <div>
              <NavLink activeStyle={{ color: 'red' }} exact to="/mytrips"activeClassName="activeClicked">
                My trips
              </NavLink>
            </div>
            <div>
              <NavLink activeStyle={{ color: 'red' }} exact to={`/trips/add`}activeClassName="activeClicked">
                Add trip
              </NavLink>
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  ) : (
    <div
    style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
  >
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
          href="/"
          className="text-decoration-none"
          style={{ color: 'inherit' }}
        >
        Trips{' '}
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          

    
      <div>
        <NavLink activeStyle={{ color: 'red' }} exact to="/signup">
          Signup
        </NavLink>
      </div>
      <div>
        <NavLink activeStyle={{ color: 'red' }} exact to="/login">
          Login
        </NavLink>
      </div>
      <div>
        <NavLink activeStyle={{ color: 'red' }} exact to="/login-google">
          Login with google
        </NavLink>
      </div>
      </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      </div>
  );
}
export default Navbar;
