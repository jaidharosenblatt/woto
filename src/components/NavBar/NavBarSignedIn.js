import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./NavBar.css";
import { Logo } from "../../static/Images";
import AvatarDropdwon from "./AvatarDropdown";

/**
 * @kadenrosenblatt used to render out the navbar given an array of course objects with name and page properties
 * @param current The current course the student has selected
 * @param courses contains class name, page url, and whether or not the course has a TA active currently
 * @param user contains user Name and user profile picture,
 */

const { Content, Sider } = Layout;

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
        <AvatarDropdwon user={user} showName />
      </Sider>
    </Layout>
  );
};

export default NavBarSignedIn;
