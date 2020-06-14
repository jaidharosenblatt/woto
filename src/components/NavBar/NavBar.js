import React from "react";
import { Col, Layout } from "antd";

import { MenuItems } from "./MenuItems";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import NavBarMobile from "./NavBarMobile";
import "./NavBar.css";

const { Header } = Layout;

let current = "CS330";

const handleClick = (e) => {
  current = e.key;
};

const NavBarDecider = ({ signedIn }) => {
  if (signedIn) {
    return (
      <div>
        <Col xs={24} md={0}>
          <NavBarMobile courses={MenuItems} />
        </Col>
        <Col xs={0} md={24}>
          <NavBarSignedIn
            handleClick={handleClick}
            current={current}
            menuItems={MenuItems}
          />
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
