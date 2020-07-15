import React, { useContext } from "react";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import API from "../../api/API";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @kadenrosenblatt Dropdown to display when a user clicks on their avatar in navbar
 */
const ProfileDropdown = () => {
  const context = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await API.logOut();
      context.dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Menu selectable={false} style={{ marginTop: 16 }}>
      <Menu.Item>
        <Link to="/accountsettings">
          <SettingOutlined /> Account Settings
        </Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <LogoutOutlined /> Log out
      </Menu.Item>
    </Menu>
  );
};

export default ProfileDropdown;
