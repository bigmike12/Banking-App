import AuthContext from "context/auth/AuthContext";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./NavBar.scss";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <p>Dashboard</p>
        <div className="navbar-info">
          <h1>Welcome <span>{user && user.name.toUpperCase()}</span></h1>
          <button onClick={() =>handleLogout()} className="logout">Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
