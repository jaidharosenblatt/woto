import React from "react";
import NavBarSignedIn from "./NavBarSignedIn";
import NavBarNotSignedIn from "./NavBarNotSignedIn";

const NavBarDecider = ({ isSignedIn }) => {
  if (isSignedIn) {
    return <NavBarSignedIn />;
  } else {
    return <NavBarNotSignedIn />;
  }
};

export default NavBarDecider;
