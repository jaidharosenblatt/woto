import React from "react";
import { Row, Col, Avatar, Button, Card, Space } from "antd";

import { DefaultProfile } from "../../../static/Images";

import HelpReadyInfo from "./HelpReadyInfo";
import "./HelpReady.css";

/**
 * @matthewsclar Component for students to recieve help for a given course
 */

const HelpReady = () => {

  return (
    <Card className="help-ready">
      <Space direction="vertical">
        <Row align="middle">
          <Col align="center" xs={24} md={5}>
            <div>
              <Avatar src={DefaultProfile} />
            </div>
          </Col>
          <Col align="left" xs={24} md={19}>
            <HelpReadyInfo
              TAname="Jaidha Rosenblatt"
              position="Graduate Teaching Assistant"
              time="3"
            />
          </Col>
        </Row>
        <Row align="left">
          <Col xs={24}>
            <Button type="primary" block>
              Get Help!
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default HelpReady;
