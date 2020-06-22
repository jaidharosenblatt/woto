import React from "react";
import { Row, Col } from "antd";

import TitleHeader from "../../components/header/TitleHeader";
import LocationTimeTag from "../../components/header/LocationTimeTag";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import { HelpImage } from "../../static/Images";
import TAInteraction from "../../components/tacomponents/tainteraction/TAInteraction";

/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const TAHelp = ({ course }) => {
  return (
    <div className="HelpWrapper">
      <div>
        <Row align="center">
          <Col span={24}>
            <TitleHeader
              title={`${course.name} Office Hours`}
              alt="Help"
              image={HelpImage}
              details={
                <LocationTimeTag location="Virtual" time="Now until 4pm" />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TAInteraction />
          </Col>
        </Row>
        <Row align="center">
          <Col xs={24} md={14}>
            {course.active ? <div>hi</div> : null}
          </Col>
          <Col xs={24} md={10}>
            {course.active ? <WaitQueueStatCards /> : null}
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

export default TAHelp;
