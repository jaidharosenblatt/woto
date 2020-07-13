import React, { useContext } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Space, Dropdown, Avatar } from "antd";
import { DefaultProfile } from "../../static/Images";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * @jaidharosenblatt @kadenrosenblatt Display an avatar
 * and name (optional) with a dropdown for user settings
 * @param showName whether or not to show the users name
 */
const AvatarDropdown = (props) => {
  const user = useContext(AuthContext).state.user;
  return (
    <Dropdown trigger={["click"]} overlay={<ProfileDropdown />}>
      <Space style={{ cursor: "pointer" }}>
        {props.showName ? (
          <p style={props.white ? { color: "white" } : { color: "#595959" }}>
            {user && user.name}
          </p>
        ) : null}
        <Avatar src={DefaultProfile} alt="profile pic" />
      </Space>
    </Dropdown>
  );
};

export default AvatarDropdown;
