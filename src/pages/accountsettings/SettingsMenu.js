import React from "react";
import { Menu } from "antd";
import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";

const SettingsMenu = ({ selectedKey, onChange }) => {
  return (
    <Menu
      onSelect={onChange}
      selectedKeys={selectedKey}
      style={{ background: "none", borderBottom: "0px" }}
      mode="horizontal"
    >
      <Menu.Item key="profile">
        <UserOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="login">
        <UnlockOutlined />
        Login
      </Menu.Item>
      <Menu.Item key="courses">
        <DiffOutlined />
        Courses
      </Menu.Item>
    </Menu>
  );
};

export default SettingsMenu;
