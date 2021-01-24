import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import { UserOutlined, UnlockOutlined, DiffOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
const SettingsMenu = (props) => {
  //get what page we are on
  const path = window.location.pathname.substr(1).split("accountsettings/");
  const key = path[1];

  return (
    <Menu
      defaultSelectedKeys={[key]}
      style={{ background: "none", borderBottom: "0px" }}
      mode="horizontal"
    >
      <Menu.Item key="profile">
        <Link to="/accountsettings/profile">
          <UserOutlined />
          Profile
        </Link>
      </Menu.Item>

      {!props.user.isOauthAuthenticated && (
        <Menu.Item key="login">
          <Link to="/accountsettings/login">
            <UnlockOutlined />
            Login
          </Link>
        </Menu.Item>
      )}

      <Menu.Item key="courses">
        <Link to="/accountsettings/courses">
          <DiffOutlined />
          Courses
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  user: selectors.getUser(state),
});

export default connect(mapStateToProps)(SettingsMenu);
