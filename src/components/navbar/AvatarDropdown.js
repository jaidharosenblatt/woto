import React, { useContext, useState } from "react";
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
  //Hide dropdown on scroll
  window.onscroll = () => {
    setVisible(false);
  };
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext).state;
  const firstName = user.name && user.name.split(" ")[0];
  return (
    <div className="avatar-dropdown" onClick={() => setVisible(!visible)}>
      <Dropdown visible={visible} overlay={<ProfileDropdown />}>
        <Space style={{ cursor: "pointer" }}>
          {props.showName && (
            <div>
              <p style={{ color: "#595959" }}>{firstName}</p>
            </div>
          )}
          <Avatar src={DefaultProfile} alt="profile pic" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
