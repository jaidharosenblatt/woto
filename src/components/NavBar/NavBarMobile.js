import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Layout } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";

const { Content, Sider } = Layout;

const NavBarMobile = ({ courses, user }) => {
  return (
    <Layout style={{ backgroundColor: "#40A9FF" }}>
      <Sider width={50} align="center">
        <Dropdown
          overlay={<Menu style={{ width: "100vw" }}>{courses}</Menu>}
          trigger={["click"]}
        >
          <div>
            <Link
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MenuOutlined className="MenuIcon" />
            </Link>
          </div>
        </Dropdown>
      </Sider>
      <Content align="center">
        <Link to="/help">
          <img src={LogoWhite} alt="logo" className="Logo" />
        </Link>
      </Content>
      <Sider width={50}>
        <Link to="/accountsettings">
          <img src={user.profilePic} alt="profile pic" className="profPic" />
        </Link>
      </Sider>
    </Layout>
  );
};

export default NavBarMobile;
