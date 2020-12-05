import React from "react";
import { Button, Space, Row, Col } from "antd";
import ProfileBlock from "./tools/ProfileBlock";
import { BellIcon } from "./tools/Icons";

/**
 * @ameer50 @jaidharosenblatt
 * Modal that informs a user that their ta is ready to give them help
 * @param handleCancel callback function for cancel
 * @param handleJoin callback function for joining link
 * @param {user} avatar path to image of TA
 * @param {user} name ex "Jaidha Rosenblatt"
 * @param {user} userType ex "Graduate Teaching Assistant"
 */
const TurnHelpModal = ({ user, handleCancel, handleJoin }) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <BellIcon />
        <h1>It's your turn to get help</h1>
        <ProfileBlock user={user} />
        <Row gutter={4}>
          <Col span={12}>
            <Button block type="primary" onClick={handleJoin}>
              Join Zoom
            </Button>
          </Col>
          <Col span={12}>
            <Button block onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default TurnHelpModal;
