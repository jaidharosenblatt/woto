import React from "react";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

/**
 * @kadenrosenblatt Dropdown to display when a user clicks on their avatar in navbar
 */
const ProfileDropdown = ({ handleClick }) => {
  return (
    <Menu selectable={false} handleClick={handleClick}>
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
};

export default ProfileDropdown;
