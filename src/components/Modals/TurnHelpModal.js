import React from "react";
import { Avatar, Button, Space, Row, Col, Card, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Bell } from "../../static/Images";

const TurnHelpModal = (props) => {
  return (
    <Col align="middle">
      <Space direction="vertical">
        <img style={{ width: 40 }} src={Bell} alt="active" />
        <h1>It's your turn to get help</h1>
        <Row gutter={8} align="center">
          <Col>
            <Avatar size={40} icon={<UserOutlined />} />
          </Col>
          <Col align="left">
            <p>{props.avatar.name}</p>
            <h3>{props.avatar.position}</h3>
          </Col>
        </Row>
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
        </Row>{" "}
      </Space>
    </Col>
  );
};

export default TurnHelpModal;
