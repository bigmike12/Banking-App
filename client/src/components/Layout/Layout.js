import NavBar from "../NavBar/NavBar";
import React from "react";
import './Layout.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout-children">
      <header>
        <NavBar />
      </header>
      <main className="children">{children}</main>
    </div>
  );
};

export default Layout;
