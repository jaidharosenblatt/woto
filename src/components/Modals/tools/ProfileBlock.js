import React from "react";
import { Avatar, Row, Col } from "antd";

const ProfileBlock = ({ user }) => {
  return (
    <Row gutter={8} align="center">
      <Col>
        <Avatar size={40} src={user.avatar} />
      </Col>
      <Col align="left">
        <p>{user.name}</p>
        <h3>{user.role}</h3>
      </Col>
    </Row>
  );
};

export default ProfileBlock;
