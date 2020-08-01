import React from "react";
import "./centered.css";
/**
 * Wrap a component in a centered page
 * @param {props} children
 */
const NavBarFooterCentered = (props) => {
  return <div className="full-height-nav-footer">{props.children}</div>;
};

export default NavBarFooterCentered;
