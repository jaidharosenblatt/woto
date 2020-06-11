import React from "react";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";
import { Col } from "antd";
import NavBarSignedInXs from "./NavBarSignedInXs";

const RenderNavBarSignedIn = () => {
  return (
    <div>
      <Col xs={0} lg={24}>
        <NavBarSignedIn />
      </Col>
      <Col xs={24} lg={0}>
        <NavBarSignedInXs />
      </Col>
    </div>
  );
};
const NavBarDecider = ({ isSignedIn }) => {
  if (isSignedIn) {
    return RenderNavBarSignedIn();
  } else {
    return <NavBarNotSignedIn />;
  }
};

export default NavBarDecider;
