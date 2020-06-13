import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Space, Dropdown } from "antd";
import "./NavBar.css";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Logo } from "../../static/Images";
/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 * @param courses contains class name, page url, and whether or not the course has a TA active currently
 * @param user contains user Name and user profile picture,
 */

const { Content, Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/accountsettings">
        <SettingOutlined /> Account Settings
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/signin">
        <LogoutOutlined /> Log out
      </Link>
    </Menu.Item>
  </Menu>
);

const NavBarSignedIn = ({ user, handleClick, current, courses }) => {
  console.log(courses);
  return (
    <Layout>
      <Sider>
        <Link to="/help">
          <img src={Logo} alt="logo" className="Logo" />
        </Link>
      </Sider>
      <Content>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {courses}
        </Menu>
      </Content>
      <Sider className="Profile">
        <Dropdown overlay={menu} trigger={["click"]}>
          <div>
            <Link
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                <img
                  src={user.profilePic}
                  alt="profile pic"
                  className="profPic"
                />
                {user.name}
              </Space>
            </Link>
          </div>
        </Dropdown>
      </Sider>
    </Layout>
  );
};

export default NavBarSignedIn;
