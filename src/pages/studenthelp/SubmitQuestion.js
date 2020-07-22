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
    <Col span={24}>
      {!props.question && (
        <Announcement
          alert
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}
      <WaitQueueStatCards inQueue />

      {props.question ? (
        <>
          <CollabTable {...props} queueTime={25} />
        </>
      ) : (
        <Card title={<h2>Your Question</h2>}>
          <HelpForm CTA="Submit Your Question" onFormSubmit={submitQuestion} />
        </Card>
      )}
      <TeachingStaffCard active />
      {props.question && (
        <LeaveQueueButton handleLeave={handleLeave} style={{ padding: 8 }} />
      )}
    </Col>
  );
};

export default SubmitQuestion;
