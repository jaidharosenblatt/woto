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
      const data = await API.logOut();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    context.dispatch({ type: "LOGOUT" });
  };

  return (
    <Menu selectable={false}>
      <Menu.Item>
        <Link to="/accountsettings">
          <SettingOutlined /> Account Settings
        </Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <Link to="/signin">
          <LogoutOutlined /> Log out
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default ProfileDropdown;
