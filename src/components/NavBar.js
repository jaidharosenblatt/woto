import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to="/help">Help</Link>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default NavBar;
