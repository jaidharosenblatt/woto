import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";
const SettingsMenu = () => {
  //get what page we are on
  const path = window.location.pathname.substr(1).split("accountsettings/");
  const key = path[1];

  return (
    <Menu
      selectedKeys={[key]}
      style={{ background: "none", borderBottom: "0px" }}
      mode="horizontal"
    >
      <Menu.Item key="profile">
        <Link to="/accountsettings/profile">
          <UserOutlined />
          Profile
        </Link>
      </Menu.Item>

      <Menu.Item key="login">
        <Link to="/accountsettings/login">
          <UnlockOutlined />
          Login
        </Link>
      </Menu.Item>

      <Menu.Item key="courses">
        <Link to="/accountsettings/courses">
          <DiffOutlined />
          Courses
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default SettingsMenu;
