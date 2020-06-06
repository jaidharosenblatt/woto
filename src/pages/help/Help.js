import React from "react";
import { Row, Col, Card } from "antd";

import "./Help.css";
import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import HelpForm from "./Form/HelpForm";
import TeachingStaff from "./TeachingStaff";
import Stat from "../../components/stat/Stat";
import { HelpImage, QueueImage, ClockImageBlue } from "../../static/Images";

const HelpFormTitle = (
  <div>
    <h2>Ask a Question</h2>
    <p>If you have multiple questions, just ask one for now</p>
  </div>
);
/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = () => {
  return (
    <div className="HelpPage">
      <Row align="center">
        <Col xs={20} lg={16}>
          <Row>
            <Col span={24}>
              <TitleHeader
                title="CS330 Office Hours"
                alt="Help"
                image={HelpImage}
                details={
                  <LocationTimeTag location="Virtual" time="Now until 4pm" />
                }
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={14}>
              <Card title={HelpFormTitle}>
                <HelpForm />
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Row>
                <Col span={12}>
                  <Stat
                    title="Wait Time"
                    value={25}
                    alt="clock"
                    footer="minutes"
                    image={ClockImageBlue}
                  />
                </Col>
                <Col span={12}>
                  <Stat
                    title="Queue"
                    value={10}
                    footer="students"
                    alt="people"
                    image={QueueImage}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <TeachingStaff
                    title="Jaidha Rosenblatt"
                    status="Active"
                    taType="Grad"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Help;
