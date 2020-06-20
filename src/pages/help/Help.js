import React from "react";
import { Row, Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import FormCard from "./Form/FormCard";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import { HelpImage } from "../../static/Images";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = ({ course }) => {
  return (
    <div className="HelpWrapper">
      <div>
        <Row align="center">
          <Col span={24}>
            <TitleHeader
              title={`${course.toUpperCase()} Office Hours`}
              alt="Help"
              image={HelpImage}
              details={
                <LocationTimeTag location="Virtual" time="Now until 4pm" />
              }
            />
          </Col>
        </Row>
        <Row align="center">
          <Col xs={24} md={14}>
            <FormCard />
          </Col>
          <Col xs={24} md={10}>
            <WaitQueueStatCards />
            <Row>
              <Col span={24}>
                <TeachingStaffCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Help;
