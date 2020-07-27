import React from "react";
import { Col, Row, Card } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";
import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import EditSubmission from "../../components/buttons/EditSubmission";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} course object containing course details and activeSession
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 * @param {props} session the active session
 */
const SubmitQuestion = (props) => {
  console.log(props.session);

  const submitQuestion = (values) => {
    props.submitQuestion(values);
  };

  const handleLeave = () => {
    props.setQuestion(undefined);
    props.setStage("");
  };

  return (
    <Col span={24}>
      {!props.question && (
        <Announcement
          alert
          message={
            "You are in the queue, however, you will not be seen by a TA until you submit your question"
          }
        />
      )}
      <WaitQueueStatCards inQueue />
      {props.question && (
        <Row gutter={16} align="middle" style={{ padding: 8 }}>
          <Col span={12}>
            <EditSubmission
              question={props.question}
              CTA="Edit TA Question"
              handleSubmit={(values) => props.setQuestion(values)}
            />
          </Col>
          <Col span={12}>
            <LeaveQueueButton handleLeave={handleLeave} />
          </Col>
        </Row>
      )}
      {props.question ? (
        <>
          <CollabTable {...props} queueTime={25} />
        </>
      ) : (
        <Card title={<h2>Your Question</h2>}>
          <AdjustableQuestion
            questionForm={props.session.questionForm}
            onFormSubmit={submitQuestion}
            CTA="Submit Your Question"
          />
        </Card>
      )}
      {props.session[0] && props.session[0].staffers.size > 0 && (
        <TeachingStaffCard staffers={props.session[0].staffers} />
      )}
    </Col>
  );
};

export default SubmitQuestion;
