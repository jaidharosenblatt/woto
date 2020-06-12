import React from "react";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import "./NavBar.css";

import { Layout } from "antd";

const { Header } = Layout;

const NavBarDecider = ({ state }) => {
  if (state === "signedIn") {
    return <NavBarSignedIn />;
  }
  if (state === "signedOut") {
    return <NavBarNotSignedIn />;
  } else {
    return null;
  }
};

const NavBar = ({ state }) => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 2,
        width: "100%",
        backgroundColor: "#F4FBFF",
      }}
    >
      <NavBarDecider state={state} />
    </Header>
  );
};

export default NavBar;
