import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Space } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";

const { Content, Sider } = Layout;

const NavBarMobile = () => {
  return (
    <Layout style={{ backgroundColor: "#40A9FF" }}>
      <Sider width={50} align="center">
        <MenuOutlined className="MenuIcon" />
      </Sider>
      <Content align="center">
        <Link to="/help">
          <img src={LogoWhite} alt="logo" className="Logo" />
        </Link>
      </Content>
      <Sider width={50} />
    </Layout>
  );
};

export default NavBarMobile;
