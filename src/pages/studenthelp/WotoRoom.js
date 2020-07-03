import React from "react";
import { Row, Col, Card } from "antd";

import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import HelpForm from "./form/HelpForm";

const WotoRoom = () => {
  return (
    <Row align="center">
      <Col span={24}>
        <Card title={<h2>I'm Working On</h2>}>
          <HelpForm mode="woto" CTA="Submit What You're Working On" />
        </Card>
        <MainColabComp />
      </Col>
    </Row>
  );
};

export default WotoRoom;
