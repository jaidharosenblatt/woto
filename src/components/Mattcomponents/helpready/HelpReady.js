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
    <Card >
      <Row >
      <Col align="center" xs={24} md={4} lg={3} >
          <div className="HelpingPersonIcon">
            <Avatar size={150} src={ DefaultProfile}  />
          </div>
        </Col>
        <Col align="left" xs={24} md={20} lg={21}>
          <div className="HelpingInnerGroupWrapper">
            <HelpReadyInfo
            TAname="Jaidha Rosenblatt"
            position="Graduate Teaching Assistant"
            time="3"/>
          </div>
          </Col>
      </Row>
      <div className="MobileSpacer">
        <br/>
        <br/>
        <br/>
      </div>

      <Row align="left">
      <Col xs={24}>
          <Button type="primary" block > Get Help! </Button>
      </Col>
      </Row>
      <br/>
    </Card>
  );
};

export default HelpReady;
