import React from "react";
import "./NavBar.scss";

const Navbar = () => {
let user = "yuwa.g@konga.com"

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <p>Dashboard</p>
        <div className="navbar-info">
          <h1>{user}</h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
