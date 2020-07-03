import React, { useContext } from "react";
import { Row, Col } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import EditQuestionForm from "./form/EditQuestionForm";
import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import { HelpContext } from "../../contexts/HelpContext";

const WotoRoom = () => {
  const { state } = useContext(HelpContext);

  return (
    <Row align="center">
      <Col span={24}>
        <MainColabComp />
      </Col>
      <Col span={24}>
        <Row>
          <Col xs={24} md={12}>
            {state.question && <EditQuestionForm />}
          </Col>
          <Col xs={24} md={12}>
            <WaitQueueStatCards />
            <TeachingStaffCard active />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WotoRoom;
