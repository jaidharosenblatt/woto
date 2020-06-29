import React from "react";
import { Row, Col } from "antd";

import HelpForm from "./Form/HelpForm";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";

const SubmitQuestion = ({ submitQuestion }) => {
  return (
    <Row align="center">
      <Col span={24}>
        <Announcement
          message={
            "Please submit a question in order to recieve help and collaborate with peers"
          }
        />
      </Col>
      <Col xs={24} md={14}>
        <HelpForm onFormSubmit={submitQuestion} />
      </Col>
      <Col xs={24} md={10}>
        <WaitQueueStatCards inQueue />
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
