import React, { useContext } from "react";
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
  const { user } = useContext(AuthContext).state;
  const firstName = user && user.name.split(" ")[0];
  const textColor = props.white ? { color: "white" } : { color: "#595959" };
  return (
    <div className="avatar-dropdown">
      <Dropdown trigger={["click"]} overlay={<ProfileDropdown />}>
        <Space style={{ cursor: "pointer" }}>
          {props.showName && (
            <div>
              <p style={textColor}>{firstName}</p>
            </div>
          )}
          <Avatar src={DefaultProfile} alt="profile pic" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
