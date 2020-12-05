import React from "react";
import { Avatar, Row, Col } from "antd";

/**
 * @jaidharosenblatt Used to visualize a user's avatar, name, and userType
 * @param {user} avatar path to image
 * @param {user} name ex "Jaidha Rosenblatt"
 * @param {user} userType ex "Graduate Teaching Assistant"
 */
const ProfileBlock = ({ user }) => {
  return (
    <Row gutter={8} align="center">
      <Col>
        <Avatar size={40} src={user.avatar} />
      </Col>
      <Col align="left">
        <p>{user.name}</p>
        <h3>{user.userType}</h3>
      </Col>
    </Row>
  );
};

export default ProfileBlock;
