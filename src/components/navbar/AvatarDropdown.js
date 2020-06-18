import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Space, Dropdown } from "antd";
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
class AvatarDropdown extends React.Component {
  state = {
    visible: false,
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };

  render() {
    return (
      <Dropdown
        overlay={<ProfileDropdown handleClick={this.handleClick} />}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <Space>
          {this.props.showName ? user.name : null}
          <img src={user.profilePic} alt="profile pic" className="ProfilePic" />
        </Space>
      </Dropdown>
    );
  }
}

export default AvatarDropdown;
