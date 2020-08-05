import React from "react";
import { Col, Card, Row, Space } from "antd";

import Announcement from "../../components/announcement/Announcement";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import BeingHelped from "./BeingHelped";
import GroupInteraction from "./WotoManager";
import QueueStatus from "./QueueStatus";

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
      <QueueStatus {...props} />
      {!props.question.description && (
        <Announcement
          alert
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}
      {/* If an assistant is helping them */}
      {props.question && props.question.assistant && <BeingHelped {...props} />}

      {!props.question.description && (
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
      )}
      {props.description && <GroupInteraction {...props} />}

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
