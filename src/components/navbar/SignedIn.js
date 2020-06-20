import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./NavBar.css";
import { Logo } from "../../static/Images";
import AvatarDropdwon from "./AvatarDropdown";

/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 */
const { Content, Sider } = Layout;
const styles = {
  page: { height: "68px", backgroundColor: "#F4FBFF" },
  menu: {
    background: "none",
    borderBottom: "0px",
    height: "52px",
    lineHeight: "46px",
    hover: { cursor: "pointer" },
  },
};
const SignedIn = ({ handleClick, current, menuItems }) => {
  return (
    <Layout style={styles.page}>
      <Sider>
        <Link to="/">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content align="center">
        <div className="CenterLeftContainer">
          <Menu
            style={styles.menu}
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            {menuItems}
          </Menu>
        </div>
      </Content>
      <Sider align="right">
        <AvatarDropdwon showName style={styles.hover} />
      </Sider>
    </Layout>
  );
};

export default SignedIn;
