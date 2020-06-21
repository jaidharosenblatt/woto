import React from "react";
import { Menu } from "antd";
import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";

const SettingsMenu = ({ selectedKey, onChange, menu }) => {
  return (

    <Menu
      onSelect={onChange}
      selectedKeys={selectedKey}
      style={{ background: "none", borderBottom: "0px" }}
      mode="horizontal"
    >
      <Menu.Item key="waitTime">
        <UserOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="studentsSeen">
        <UnlockOutlined />
        Login
      </Menu.Item>
    </Menu>
  );
};

export default SettingsMenu;
