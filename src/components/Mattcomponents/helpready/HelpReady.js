import React from "react";
import { Row, Col, Avatar, Button } from "antd";

import { DefaultProfile } from "../../../static/Images";

import HelpReadyInfo from "./HelpReadyInfo";
import "./HelpReady.css";

/**
 * @matthewsclar Component for students to recieve help for a given course
 */


const HelpReady = () => {
  return (
    <div className="HelpingGroupWrapper">

      <Row align="center">
        <Col xs={5}>
          <div className="HelpingPersonIcon">
            <Avatar size={150} src={ DefaultProfile}  />
          </div>
        </Col>
        <Col xs={17}>
        <div className="HelpingInnerGroupWrapper">
          <HelpReadyInfo
          TAname="Jaidha Rosenblatt"
          position="Graduate Teaching Assistant"
          time="3"/>
        </div>
        </Col>
      </Row>

      <Row align="center">
        <Col xs ={20}>
          <Button type="primary" block > Get Help! </Button>
        </Col>
      </Row>
      <br/>
    </div>
  );
};

export default HelpReady;
