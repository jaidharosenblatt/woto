import React from "react";
import { Button, Space, Row, Col } from "antd";
import { Bell } from "../../static/Images";
import ProfileBlock from "./tools/ProfileBlock";

const TurnHelpModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1>It's your turn to get help</h1>
        <ProfileBlock user={props.user} />
        <Row gutter={4}>
          <Col span={12}>
            <Button block type="primary">
              Join Zoom
            </Button>
          </Col>
          <Col span={12}>
            <Button block onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Space>
    </Col>
  );
};

export default TurnHelpModal;
