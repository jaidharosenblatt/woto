import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Layout } from "antd";
import { LogoWhite } from "../../static/Images";
import { MenuOutlined } from "@ant-design/icons";
import "./NavBar.css";
import AvatarDropdown from "./AvatarDropdown";

const { Content, Sider } = Layout;

/**
 * @jaidharosenblatt Mobile view for navbar that has hamburger icon
 * @param menuItems array of MenuItems that represent the
 * active user's courses (and links to their respective pages)
 */
const NavBarMobile = ({ menuItems }) => {
  return (
    <Layout style={{ backgroundColor: "#40A9FF" }}>
      <Sider width={50} align="center">
        <Dropdown
          overlay={<Menu style={{ width: "100vw" }}>{menuItems}</Menu>}
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
        <AvatarDropdown />
      </Sider>
    </Layout>
  );
};

export default NavBarMobile;
