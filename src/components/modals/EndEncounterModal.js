import React from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button, Space, Col } from "antd";
import ProfileBlock from "./tools/ProfileBlock";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that informs a student that a session has ended
 * @param handleCancel callback function for cancel
 * @param handleJoin callback function for joining link
 * @param {user} avatar path to image
 * @param {user} name ex "Jaidha Rosenblatt"
 * @param {user} role ex "Graduate Teaching Assistant"
 */
const EndEncounterModal = ({ handleRate, user }) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>End of your turn with</h1>
        <ProfileBlock user={user} />
        <Space>
          <Button
            type="primary"
            ghost
            icon={<LikeOutlined style={{ fontSize: "100%" }} />}
          />
          <Button
            type="danger"
            ghost
            icon={<DislikeOutlined style={{ fontSize: "100%" }} />}
          />
        </Space>
      </Space>
    </Col>
  );
};

export default EndEncounterModal;
