import React from "react";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import NavBarMobile from "./NavBarMobile";

import "./NavBar.css";

import { Col, Layout } from "antd";

const { Header } = Layout;

const NavBarDecider = ({ signedIn }) => {
  if (signedIn) {
    return (
      <div>
        <Col xs={24} md={0}>
          <NavBarMobile />
        </Col>
        <Col xs={0} md={24}>
          <NavBarSignedIn />
        </Col>
      </div>
    );
  } else {
    return <NavBarNotSignedIn />;
  }
};

const NavBar = ({ signedIn }) => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 2,
        padding: 0,
        width: "100%",
        backgroundColor: "#F4FBFF",
      }}
    >
      <NavBarDecider signedIn={signedIn} />
    </Header>
  );
};

export default NavBar;
