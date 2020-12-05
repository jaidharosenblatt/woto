import React, { useState, useRef, useEffect } from "react";
import { Space, Dropdown, Avatar } from "antd";

import ProfileDropdown from "./ProfileDropdown";
import { DefaultProfile } from "../../../static/Images";
import "./NavBar.css";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
/**
 * @jaidharosenblatt @kadenrosenblatt Display an avatar
 * and name (optional) with a dropdown for user settings
 *
 * For some reason ant design makes you choose between toggling visibility on click
 * inside menu and outside menu so I used a solution from SO to track clicks outside
 * https://stackoverflow.com/questions/54391682/detect-click-outside-component-react-hooks
 * @param showName whether or not to show the users name
 */
const AvatarDropdown = ({ showName, name }) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const firstName = name?.split(" ")[0];

  //Hide dropdown on scroll
  window.onscroll = () => {
    setVisible(false);
  };

  // Track clicks
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  return (
    <div
      className="avatar-dropdown"
      onClick={() => setVisible(!visible)}
      ref={wrapperRef}
    >
      <Dropdown visible={visible} overlay={<ProfileDropdown />}>
        <Space style={{ cursor: "pointer" }}>
          {showName && (
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

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    name: selectors.getUserName(state),
  };
};

export default connect(mapStateToProps)(AvatarDropdown);
