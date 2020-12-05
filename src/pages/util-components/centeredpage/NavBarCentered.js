import React from "react";
import "./centered.css";
/**
 * Wrap a component in a centered page
 * @param {props} children
 */
const NavBarCentered = (props) => {
  return <div className="full-height-nav">{props.children}</div>;
};

export default NavBarCentered;
