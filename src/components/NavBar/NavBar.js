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
    backgroundColor: "#F4FBFF",
  },
};
/**
 * @jaidharosenblatt Render a navbar in a header. Stores current page in a state
 */
class NavBar extends React.Component {
  constructor() {
    super();
    this.state = { current: "CS330" };
  }
  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    return (
      <Header style={styles.header}>
        <NavBarDecider
          current={this.state.current}
          handleClick={this.handleClick}
        />
      </Header>
    );
  }
}

export default NavBar;
