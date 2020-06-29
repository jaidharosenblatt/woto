import React from "react";
import { Row, Col } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import YourQuestionCard from "../../components/collapsedquestion/YourQuestionCard";
import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";

const Waiting = ({ question }) => {
  return (
    <Row align="center">
      <Col span={24}>
        <WaitQueueStatCards />
        <MainColabComp />
      </Col>
      <Col span={24}>
        <Row>
          <Col xs={24} md={12}>
            <YourQuestionCard details={question} />
          </Col>
          <Col xs={24} md={12}>
            <TeachingStaffCard active />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Waiting;
