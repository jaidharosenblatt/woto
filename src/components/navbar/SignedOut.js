import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { LogoWhite } from "../../static/Images";
import "./NavBar.css";

const { Content, Sider } = Layout;

/**
 * @kadenrosenblatt navbar to show when user is not logged in.
 * Prompts user to sign in/sign up
 */
const SignedOut = () => {
  return (
    <Layout style={{ height: "68px", backgroundColor: "#40A9FF" }}>
      <Sider>
        <Link to="/">
          <img src={LogoWhite} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content />
      <Sider align="right">
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

export default SignedOut;
