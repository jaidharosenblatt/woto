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

const SignedIn = ({ handleClick, current, menuItems }) => {
  return (
    <Layout style={{ height: "68px" }}>
      <Sider>
        <Link to="/">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content align="center">
        <Menu
          style={{ background: "none", borderBottom: "0px" }}
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          {menuItems}
        </Menu>
      </Content>
      <Sider align="right">
        <AvatarDropdwon showName style={{ cursor: "pointer" }} />
      </Sider>
    </Layout>
  );
};

export default SignedIn;
