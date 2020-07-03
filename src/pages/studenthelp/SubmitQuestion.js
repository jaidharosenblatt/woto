import React, { useContext } from "react";
import { Row, Col, Card } from "antd";

import HelpForm from "./form/HelpForm";
import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";
import { HelpContext } from "../../contexts/HelpContext";
import EditQuestionForm from "./form/EditQuestionForm";

const SubmitQuestion = () => {
  const { state, dispatch } = useContext(HelpContext);

  const submitQuestion = (values) => {
    dispatch({
      type: "SUBMIT",
      payload: { question: { ...values } },
    });
  };
  const questionSubmitted = state.question !== undefined;
  return (
    <Row align="center">
      <Col span={24}>
        {!questionSubmitted && (
          <Announcement
            alert
            message={
              "Please submit a question in order to receive help and collaborate with peers"
            }
          />
        )}
      </Col>
      <Col xs={24} md={14}>
        {questionSubmitted ? (
          <EditQuestionForm />
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
