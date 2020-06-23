import React from "react";
import { Row, Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import FormCard from "./Form/FormCard";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import { HelpImage, WaitingImage } from "../../static/Images";
import InactiveSessionCard from "./InactiveSessionCard";

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
              title={`${course.name} Office Hours`}
              alt="Help"
              image={course.active ? HelpImage : WaitingImage}
              details={
                course.active ? (
                  <LocationTimeTag location="Virtual" time="Now until 4pm" />
                ) : (
                  <LocationTimeTag time="No active sessions" />
                )
              }
            />
          </Col>
        </Row>
        <Row align="center">
          <Col xs={24} md={14}>
            {course.active ? <FormCard /> : <InactiveSessionCard />}
          </Col>
          <Col xs={24} md={10}>
            {course.active ? <WaitQueueStatCards /> : null}
            <Row>
              <Col span={24}>
                {course.active ? (
                  <TeachingStaffCard active />
                ) : (
                  <TeachingStaffCard />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Help;
