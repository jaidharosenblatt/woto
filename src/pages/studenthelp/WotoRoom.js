import React from "react";
import { Row, Col, Card, Space, Alert } from "antd";

import MainColabComp from "../../components/Tables/StudentCollaborate/MainColabComp";
import HelpForm from "./form/HelpForm";
import TitleHeader from "../../components/header/TitleHeader";

const WotoRoom = ({ active, courseName, setStage }) => {
  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${courseName} Woto Room`}
          details={<h3>Work together with your peers</h3>}
        />
        {active && (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => setStage("submit")}
            message="There is an active office hours session from now until 4pm. Click here to join!"
            type="success"
          />
        )}
      </Col>
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
