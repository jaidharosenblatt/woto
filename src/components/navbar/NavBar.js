import React from "react";
import { Layout } from "antd";
import NavBarDecider from "./NavBarDecider";
import "./NavBar.css";

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
  return (
    <Header style={styles.header}>
      <NavBarDecider courses={props.courses} signedIn={props.signedIn} />
    </Header>
  );
};

export default NavBar;
