import React from "react";
import { Col } from "antd";

import { MenuItems } from "./MenuItems";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import NavBarMobile from "./NavBarMobile";

const signedIn = true;

/**
 * @jaidharosenblatt Choose between mobile and desktop view and signedin/signout status
 * @param current the key of the course page currently selected
 * @param handleClick the method to call when user clicks on page
 */
const NavBarDecider = ({ current, handleClick }) => {
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

export default NavBarDecider;
