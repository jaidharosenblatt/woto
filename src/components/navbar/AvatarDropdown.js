import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Space, Dropdown, Avatar } from "antd";
import { DefaultProfile } from "../../static/Images";

// Temporary user TODO replace with network call
const user = {
  name: "Kaden",
  profilePic: DefaultProfile,
};

/**
 * @jaidharosenblatt @kadenrosenblatt Display an avatar
 * and name (optional) with a dropdown for user settings
 * @param showName whether or not to show the users name
 */
const AvatarDropdown = (props) => {
  return (
    <Dropdown overlay={<ProfileDropdown />}>
      <Space>
        {props.showName ? user.name : null}
        <Avatar src={user.profilePic} alt="profile pic" />
      </Space>
    </Dropdown>
  );
};

export default AvatarDropdown;
