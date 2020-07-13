import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Space, Dropdown, Avatar } from "antd";

import ProfileDropdown from "./ProfileDropdown";
import { DefaultProfile } from "../../static/Images";
import { AuthContext } from "../../contexts/AuthContext";
import "./NavBar.css";
/**
 * @jaidharosenblatt @kadenrosenblatt Display an avatar
 * and name (optional) with a dropdown for user settings
 * @param showName whether or not to show the users name
 */
const AvatarDropdown = (props) => {
  const user = useContext(AuthContext).state.user;
  return (
    <div className="avatar-dropdown">
      <Dropdown trigger={["click"]} overlay={<ProfileDropdown />}>
        <Space style={{ cursor: "pointer" }}>
          {props.showName ? (
            <div>
              <p
                style={props.white ? { color: "white" } : { color: "#595959" }}
              >
                {user && user.name}
              </p>
              <Link to="/admin">Admin</Link>
            </div>
          ) : null}
          <Avatar src={DefaultProfile} alt="profile pic" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
