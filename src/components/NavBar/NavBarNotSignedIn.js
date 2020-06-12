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
        <Link to="/help">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content />
      <Sider className="Buttons">
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
