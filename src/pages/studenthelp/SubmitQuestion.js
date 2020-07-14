import React from "react";
import { Row, Col, Card } from "antd";

import HelpForm from "./form/HelpForm";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";
import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import CollabTable from "../../components/Tables/CollabTable";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} course object containing course details and activeSession
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 */
const SubmitQuestion = (props) => {
  const submitQuestion = (values) => {
    props.setQuestion(values);
  };

  const handleLeave = () => {
    props.setQuestion(undefined);
    props.setStage("");
  };

  return (
    <Row align="center">
      <Col span={24}>
        {!props.question && (
          <Announcement
            alert
            message={
              "Please submit a question in order to receive help and collaborate with peers"
            }
          />
        )}
      </Col>
      <Col span={24}>
        {props.question && (
          <>
            <WaitQueueStatCards inQueue />
            <CollabTable {...props} queueTime={25} />
          </>
        )}
        {!props.question && (
          <Row>
            <Col xs={24} md={14}>
              <Card title={<h2>Your Question</h2>}>
                <HelpForm
                  CTA="Submit Your Question"
                  onFormSubmit={submitQuestion}
                />
              </Card>
            </Col>
            <Col xs={24} md={10}>
              <WaitQueueStatCards inQueue />
              <TeachingStaffCard active />
            </Col>
          </Row>
        )}
      </Col>
      {props.question && (
        <Col span={24}>
          <TeachingStaffCard active />
          <LeaveQueueButton handleLeave={handleLeave} style={{ padding: 8 }} />
        </Col>
      )}
    </Row>
  );
};

export default SubmitQuestion;
