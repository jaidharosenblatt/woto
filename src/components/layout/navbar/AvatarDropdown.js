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
 * @param {User} user
 */
const AvatarDropdown = ({ showName, user }) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const firstName = user.name?.split(" ")[0];

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

  const hide = () => setVisible(!visible);

  return (
    <div className="avatar-dropdown" ref={wrapperRef}>
      <Dropdown visible={visible} overlay={<ProfileDropdown />}>
        <Space style={{ cursor: "pointer" }}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://airtable.com/shrXsmGLQq88F3tzT"
          >
            Need Help?
          </a>
          {showName && (
            <div onClick={hide}>
              <p style={{ color: "#595959" }}>{firstName}</p>
            </div>
          )}
          <Avatar
            onClick={hide}
            src={user.avatar || DefaultProfile}
            alt="profile pic"
          />
        </Space>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    user: selectors.getUser(state),
  };
};

export default connect(mapStateToProps)(AvatarDropdown);
