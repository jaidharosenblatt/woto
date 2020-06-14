import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Space, Dropdown } from "antd";
import { Link } from "react-router-dom";

const AvatarDropdown = ({ user, showName }) => {
  return (
    <Dropdown overlay={<ProfileDropdown />} trigger={["click"]}>
      <div>
        <Link className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={user.profilePic} alt="profile pic" className="profPic" />
            {showName ? user.name : null}
          </Space>
        </Link>
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
