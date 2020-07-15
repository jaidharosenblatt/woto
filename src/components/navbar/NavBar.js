import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Row, Col } from "antd";
import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";

/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
const NavBar = (props) => {
  const menuItems = MenuItems(props.courses);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const res = window.location.pathname.substr(1);
    setSelected(res);
  }, []);

  if (props.signedIn) {
    return (
      <Row align="middle" className="navbar-wrapper">
        <Col span={24}>
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
              />
            )}
          </div>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row align="middle" className="navbar-wrapper">
        <Col span={24} className="signedout-navbar">
          <SignedOut />
        </Col>
      </Row>
    );
  }
};

export default NavBar;
