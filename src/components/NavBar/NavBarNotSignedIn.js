import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { Logo } from "../../static/Images";
import "./NavBar.css";

const { Content, Sider } = Layout;

const NavBarNotSignedIn = () => {
  return (
    <Layout>
      <Sider>
        <img src={Logo} alt="logo" className="Logo" />
      </Sider>
      <Content />
      <Sider className="Buttons">
        <Space>
          <Link to="/SignIn">
            <Button type="primary">Sign In</Button>
          </Link>
          <Link to="/SignUp">
            <Button>Sign Up</Button>
          </Link>
        </Space>
      </Sider>
    </Layout>
  );
};

export default NavBarNotSignedIn;
