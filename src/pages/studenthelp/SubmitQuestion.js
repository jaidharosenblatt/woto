import React, { useState } from "react";
import { Row, Col, Card } from "antd";

import HelpForm from "./form/HelpForm";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";
import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import CollabTable from "../../components/Tables/CollabTable";

const SubmitQuestion = ({ setStage, question, setQuestion }) => {
  const submitQuestion = (values) => {
    setQuestion(values);
  };

  const handleLeave = () => {
    setQuestion({});
    setStage("");
  };
  return (
    <Row align="center">
      <Col span={24}>
        {question ? (
          <CollabTable question={question} />
        ) : (
          <Announcement
            alert
            message={
              "Please submit a question in order to receive help and collaborate with peers"
            }
          />
        )}
      </Col>
      <Col xs={24} md={14}>
        {question ? (
          <Card
            title={
              <Row align="middle">
                <Col span={12}>
                  <h2>Edit Your Question</h2>
                </Col>
                <Col span={12} align="right">
                  <LeaveQueueButton handleLeave={handleLeave} />
                </Col>
              </Row>
            }
          >
            <HelpForm
              initialValues={question}
              CTA="Edit Your Question"
              onFormSubmit={submitQuestion}
            />
          </Card>
        ) : (
          <Card title={<h2>Your Question</h2>}>
            <HelpForm
              CTA="Submit Your Question"
              onFormSubmit={submitQuestion}
            />
          </Card>
        )}
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
