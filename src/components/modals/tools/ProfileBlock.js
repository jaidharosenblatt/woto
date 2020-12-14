import React from "react";
import { Avatar, Row, Col } from "antd";
import { DefaultProfile } from "../../../static/Images";

/**
 * @jaidharosenblatt Used to visualize a user's avatar, name, and userType
 * @param {user} avatar path to image
 * @param {user} name ex "Jaidha Rosenblatt"
 * @param {user} role ex "Graduate Teaching Assistant"
 */
const ProfileBlock = ({ user = {} }) => {
  return (
    <Row gutter={8} align="center">
      <Col>
        <Avatar size={40} src={user.avatar || DefaultProfile} />
      </Col>
      <Col align="left">
        <p>{user.name}</p>
        <h3>{user.role}</h3>
      </Col>
    </Row>
  );
};

export default ProfileBlock;
