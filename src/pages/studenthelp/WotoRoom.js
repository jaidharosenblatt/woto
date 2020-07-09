import React, { useState } from "react";
import { Row, Col, Card, Space, Alert } from "antd";

import CollabTable from "../../components/Tables/CollabTable";
import HelpForm from "./form/HelpForm";
import TitleHeader from "../../components/header/TitleHeader";

const WotoRoom = ({ active, courseName, setStage }) => {
  const [question, setQuestion] = useState();

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
        {question ? (
          <CollabTable question={{ ...question }} queueTime={2} />
        ) : (
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
            <HelpForm
              initialValues={{
                assignment: "Assignment 1",
                stage: "Getting Started",
                concepts: ["Array"],
                meetingUrl: "https://duke.zoom.us/j/123456789",
                details: "Really struggling here",
              }}
              onFormSubmit={(values) => setQuestion(values)}
              mode="woto"
              CTA={`Join ${courseName}'s Woto Room`}
            />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default WotoRoom;
