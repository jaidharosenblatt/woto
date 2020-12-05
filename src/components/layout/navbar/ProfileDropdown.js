import React from "react";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../redux/auth/actionCreators";
/**
 * Dropdown to display when a user clicks on their avatar in navbar
 * @param {Function} logout actionCreator for logging out
 */
const ProfileDropdown = (props) => {
  return (
    <Menu selectable={false} style={{ marginTop: 16 }}>
      <Menu.Item>
        <Link to="/accountsettings">
          <SettingOutlined /> Account Settings
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => props.logout()}>
        <LogoutOutlined /> Log out
      </Menu.Item>
    </Menu>
  );
};

export default connect(null, { logout })(ProfileDropdown);
