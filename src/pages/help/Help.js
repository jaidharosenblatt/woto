import React from "react";
import { Row, Col } from "antd";

import "./Help.css";
import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import FormCard from "./Form/FormCard";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import Stat from "../../components/stat/Stat";
import { HelpImage, QueueImage, ClockImageBlue } from "../../static/Images";

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
              <FormCard />
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
                  <TeachingStaffCard />
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
