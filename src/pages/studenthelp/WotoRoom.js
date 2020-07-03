import React, { useContext } from "react";
import { Row, Col } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
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
          <Col xs={24}>
            <WaitQueueStatCards />
            <TeachingStaffCard active />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WotoRoom;
