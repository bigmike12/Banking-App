import AuthContext from "context/auth/AuthContext";
import React, { useContext } from "react";
import "./NavBar.scss";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;


  return (
    <div className="navbar-container">
      <nav className="navbar">
        <p>Dashboard</p>
        <div className="navbar-info">
          <h1>Welcome <span>{user && user.name.toUpperCase()}</span></h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
