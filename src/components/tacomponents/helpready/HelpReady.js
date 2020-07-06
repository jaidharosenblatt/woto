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
      <Col span={24}>
        <Row align="middle" gutter={24}>
          <Col xs={8} md={4} align="left">
            <Avatar src={DefaultProfile} />
          </Col>
          <Col xs={16} md={20}>
            <Space direction="vertical">
              <HelpReadyInfo
                TAname="Jaidha Rosenblatt"
                position="Graduate Teaching Assistant"
                time="3"
              />
              <Button type="primary" block>
                Get Help!
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default HelpReady;
