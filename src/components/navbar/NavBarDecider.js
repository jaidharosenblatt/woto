import React from "react";
import { Col } from "antd";

import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";

//temporary value to be replaced by network call

/**
 * @jaidharosenblatt Choose between mobile and desktop view and signedin/signout status
 * @param current the key of the course page currently selected
 * @param handleClick the method to call when user clicks on page
 */
const NavBarDecider = ({ courses, signedIn, current, handleClick }) => {
  const menuItems = MenuItems(courses);

  if (signedIn) {
    return (
      <div>
        <Col xs={24} md={0}>
          <Mobile menuItems={menuItems} />
        </Col>
        <Col xs={0} md={24}>
          <SignedIn
            handleClick={handleClick}
            current={current}
            menuItems={menuItems}
          />
        </Col>
      </div>
    );
  } else {
    return <SignedOut />;
  }
};

export default NavBarDecider;
