import React from "react";
import { Col, Card, Row, Space } from "antd";

import Announcement from "../../components/announcement/Announcement";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import ActiveHeader from "../../components/header/ActiveHeader";
import BeingHelped from "./BeingHelped";
import GroupInteraction from "./GroupInteraction";
import QueueStatus from "./QueueStatus";
import EditSubmission from "../../components/buttons/EditSubmission";
import CollapsedQuestion from "../../components/collapsedquestion/CollapsedQuestion";

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
  console.log(props.session);

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
      {!props.question.description && (
        <Announcement
          alert
          message={
            "You are in the queue, however, you will not be seen by a TA until you submit your question"
          }
        />
      )}
      {/* If an assistant is helping them */}
      {props.question && props.question.assistant && <BeingHelped {...props} />}

      {props.question.description ? (
        <Row>
          <Col span={16} style={{ height: "100%" }}>
            <QueueStatus {...props} />
          </Col>
          <Col span={8}>
            <Card
              title={
                <Space size={0}>
                  <h2>Your Question</h2>{" "}
                  <EditSubmission
                    question={props.description}
                    handleSubmit={props.editTAQuestion}
                  />
                </Space>
              }
            >
              <CollapsedQuestion details={props.description} />
            </Card>
          </Col>
        </Row>
      ) : (
        <Col>
          <QueueStatus {...props} />
          <Card
            title={
              <Space direction="vertical">
                <h2>What's Your Question?</h2>
                <p>Please describe what you need help from a TA with</p>
              </Space>
            }
          >
            <AdjustableQuestion
              questionForm={
                props.course.sessionAttributes &&
                props.course.sessionAttributes.questionTemplate
              }
              onFormSubmit={props.submitQuestion}
              CTA="Submit Your Question"
            />
          </Card>
        </Col>
      )}
      {props.discussionParticipant && <GroupInteraction {...props} />}

      {/* If they have submitted the question form*/}
      {props.question && props.question.description && (
        <>
          <CollabTable {...props} queueTime={25} />
        </>
      )}
      {/* <LeaveQueueButton handleLeave={props.leaveTAQueue} />{" "} */}
    </Col>
  );
};

export default SubmitQuestion;
