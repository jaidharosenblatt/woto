import React from "react";
import { Col, Card, Row } from "antd";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import WaitQueueStatCards from "../../components/stat/WaitQueueStatCards";
import Announcement from "../../components/announcement/Announcement";
import LeaveQueueButton from "../../components/buttons/LeaveQueueButton";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import EditSubmission from "../../components/buttons/EditSubmission";
import ActiveHeader from "../../components/header/ActiveHeader";
import BeingHelped from "./BeingHelped";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 * @param {props} course course for this session
 * @param {props} session active session if there is one
 * @param {props} description fields describing question/submission
 * @param {props} setDescription callback to set description
 * @param {props} discussion woto room submission
 * @param {props} setDiscussion callback to woto room
 * @param {props} setStage change the state of the page
 * @param {props} postDiscussion callback to join the woto room
 * @param {props} postQuestion callback to join TA queue
 * @param {props} submitQuestion callback to edit TA answer
 * @param {props} leaveTAQueue callback to leave the TA queue
 */
const SubmitQuestion = (props) => {
  return (
    <Col span={24}>
      <ActiveHeader session={props.session} courseCode={props.course.code} />
      <Row align="center">
        <Col span={24}>
          {props.session &&
            props.session.accouncements &&
            props.session.accouncements.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  message={`TA Announcement: ${item.announcement}`}
                />
              );
            })}
        </Col>
      </Row>
      {!props.question && (
        <Announcement
          alert
          message={
            "You are in the queue, however, you will not be seen by a TA until you submit your question"
          }
        />
      )}
      {/* If an assistant is helping them */}
      {props.question && props.question.assistant && <BeingHelped {...props} />}
      <WaitQueueStatCards inQueue />
      {/* If they are in the TA queue but not a woto room */}
      {props.question && props.question.description && !props.discussion && (
        <Col span={24} style={{ padding: 8 }}>
          <EditSubmission
            question={props.description}
            CTA="Edit TA Question"
            handleSubmit={props.editTAQuestion}
          />
        </Col>
      )}
      {/* If they have submitted the question form*/}
      {props.question && props.question.description ? (
        <>
          <CollabTable {...props} queueTime={25} />
        </>
      ) : (
        <Card title={<h2>Your Question</h2>}>
          <AdjustableQuestion
            questionForm={
              props.course.sessionAttributes &&
              props.course.sessionAttributes.questionTemplate
            }
            onFormSubmit={props.submitQuestion}
            CTA="Submit Your Question"
          />
        </Card>
      )}
      {/* Display staffers cards if there are active teaching staff */}
      {props.session && props.session.staffers.size > 0 && (
        <TeachingStaffCard staffers={props.session[0].staffers} />
      )}
      <Col span={24} style={{ padding: 8 }}>
        <LeaveQueueButton handleLeave={props.leaveTAQueue} />
      </Col>
    </Col>
  );
};

export default SubmitQuestion;
