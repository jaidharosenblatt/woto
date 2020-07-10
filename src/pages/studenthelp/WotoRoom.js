import React from "react";
import { Row, Col, Card, Space, Alert } from "antd";

import CollabTable from "../../components/Tables/CollabTable";
import HelpForm from "./form/HelpForm";
import TitleHeader from "../../components/header/TitleHeader";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} active whether there is active office hours for this course
 * @param {props} courseName course code to display ex "CS230"
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 */
const WotoRoom = (props) => {
  return (
    <Row align="center">
      <Col span={24}>
        <TitleHeader
          title={`${props.courseName} Woto Room`}
          details={<h3>Work together with your peers</h3>}
        />
        {props.active && (
          <Alert
            style={{ cursor: "pointer" }}
            onClick={() => props.setStage("submit")}
            message="There is an active office hours session from now until 4pm. Click here to join!"
            type="success"
          />
        )}
      </Col>
      <Col span={24}>
        {props.question ? (
          <CollabTable question={{ ...props.question }} queueTime={2} />
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
                assignment: ["Assignment 1"],
                stage: "Getting Started",
                concepts: ["Array"],
                meetingUrl: "https://duke.zoom.us/j/123456789",
                details: "Really struggling here",
              }}
              onFormSubmit={(values) => props.setQuestion(values)}
              mode="woto"
              CTA={`Join ${props.courseName}'s Woto Room`}
            />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default WotoRoom;
