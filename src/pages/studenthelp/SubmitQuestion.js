import React from "react";
import { Row, Col } from "antd";

import FormCard from "./Form/FormCard";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";

const SubmitQuestion = ({ submitQuestion }) => {
  return (
    <Row align="center">
      <Col xs={24} md={14}>
        <FormCard onFormSubmit={submitQuestion} />
      </Col>
      <Col xs={24} md={10}>
        <WaitQueueStatCards />
        <Row>
          <Col span={24}>
            <TeachingStaffCard active />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SubmitQuestion;
