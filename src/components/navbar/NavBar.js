import React from "react";
import { Layout } from "antd";
import "./NavBar.css";

import MenuItems from "./MenuItems";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import Mobile from "./Mobile";

const { Header } = Layout;
const styles = {
  header: {
    position: "fixed",
    zIndex: 2,
    padding: 0,
    width: "100%",
  },
};
/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
const NavBar = (props) => {
  const menuItems = MenuItems(props.courses);

  if (props.signedIn) {
    return (
      <Header style={styles.header}>
        <div className="mobile-navbar">
          <Mobile menuItems={menuItems} />
        </div>
        <div className="desktop-navbar">
          {/* Fixing navbar overflow for too many courses */}
          {props.courses.length > 6 ? (
            <Mobile menuItems={menuItems} />
          ) : (
            <SignedIn menuItems={menuItems} />
          )}
        </div>
      </Header>
    );
  } else {
    return (
      <Header style={styles.header}>
        <SignedOut />
      </Header>
    );
  }
};

export default NavBar;
