import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Space, Dropdown } from "antd";
import { Kaden } from "../../static/Images";

// Temporary user TODO replace with network call
const user = {
  name: "Kaden",
  profilePic: Kaden,
};

/**
 * @jaidharosenblatt @kadenrosenblatt Display an avatar
 * and name (optional) with a dropdown for user settings
 * @param showName whether or not to show the users name
 */
const AvatarDropdown = ({ showName }) => {
  return (
    <Dropdown overlay={<ProfileDropdown />} trigger={["click"]}>
      <Space>
        {showName ? user.name : null}
        <img src={user.profilePic} alt="profile pic" className="ProfilePic" />
      </Space>
    </Dropdown>
  );
};

export default AvatarDropdown;
