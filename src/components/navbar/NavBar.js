import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Row } from "antd";
import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";

/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
const NavBar = (props) => {
  const menuItems = MenuItems(props.courses);
  const whiteMenuItems = MenuItems(props.courses, true);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const res = window.location.pathname.substr(1);
    setSelected(res);
  }, []);

  if (props.signedIn) {
    return (
      <Row align="middle" className="navbar-wrapper">
        <div className="mobile-navbar">
          <Mobile
            handleSelect={setSelected}
            selected={selected}
            menuItems={menuItems}
          />
        </div>
        <div className="desktop-navbar">
          {/* Fixing navbar overflow for too many courses */}
          {props.courses.length > 4 ? (
            <Mobile
              handleSelect={setSelected}
              selected={selected}
              menuItems={menuItems}
            />
          ) : (
            <SignedIn
              handleSelect={setSelected}
              selected={selected}
              menuItems={menuItems}
              whiteMenuItems={whiteMenuItems}
            />
          )}
        </div>
      </Row>
    );
  } else {
    return (
      <div className="navbar-wrapper">
        <div className="signedout-navbar">
          <SignedOut />
        </div>
      </div>
    );
  }
};

export default NavBar;
