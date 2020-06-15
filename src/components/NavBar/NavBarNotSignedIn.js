import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { Logo } from "../../static/Images";
import "./NavBar.css";

const { Content, Sider } = Layout;

/**
 * @kadenrosenblatt navbar to show when user is not logged in.
 * Prompts user to sign in/sign up
 */
const NavBarNotSignedIn = () => {
  return (
    <Layout style={{ height: "68px" }}>
      <Sider>
        <Link to="/">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content />
      <Sider>
        <Space>
          <Link to="/signin">
            <Button type="primary">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </Space>
      </Sider>
    </Layout>
  );
};

export default NavBarNotSignedIn;
