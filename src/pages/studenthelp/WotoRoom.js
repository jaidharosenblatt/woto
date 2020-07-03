import React from "react";
import { Row, Col, Card, Space } from "antd";

import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import HelpForm from "./form/HelpForm";
import WotoHeader from "../../components/header/WotoHeader";

const WotoRoom = ({ courseName }) => {
  return (
    <Row align="center">
      <WotoHeader courseName={courseName} />
      <Col span={24}>
        <Card
          title={
            <Space direction="vertical">
              <h2>I'm Working On</h2>
              <p>
                Submit what you are working on in order to work together with
                your classmates.
              </p>
            </Space>
          }
        >
          <HelpForm mode="woto" CTA={`Join ${courseName}'s Woto Room`} />
        </Card>
        <MainColabComp />
      </Col>
    </Row>
  );
};

export default WotoRoom;
