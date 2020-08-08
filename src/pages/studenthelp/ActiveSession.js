import React, { useContext } from "react";
import { Col, Card, Row, Space, Alert } from "antd";
import { HelpContext } from "./util/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";
import functions from "./util/functions";

import Announcement from "../../components/announcement/Announcement";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import BeingHelped from "./BeingHelped";
import WotoManager from "./wotos/WotoManager";
import QueueStatus from "./QueueStatus";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const SubmitQuestion = () => {
  const { state, dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);

  return (
    <Col span={24}>
      <Row align="center">
        <Col span={24}>
          {state.session?.accouncements &&
            state.session.accouncements.map((item, key) => {
              return (
                <Announcement
                  key={key}
                  message={`TA Announcement: ${item.announcement}`}
                />
              );
            })}
        </Col>
      </Row>
      <QueueStatus />
      {!state.question.description && (
        <Announcement
          alert
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}

      {/* If an assistant is helping them */}
      {state.question?.assistant && <BeingHelped />}

      {!state.question.description && (
        <Card
          title={
            <Space direction="vertical">
              <h2>What's Your Question?</h2>
              <p>Please describe what you need help from a TA with</p>
            </Space>
          }
        >
          <AdjustableQuestion
            loading={state.loading}
            questionForm={state.course.sessionAttributes?.questionTemplate}
            onFormSubmit={(values) =>
              functions.submitQuestion(
                state,
                dispatch,
                values,
                authContext.state
              )
            }
            CTA="Submit Your Question"
          />
        </Card>
      )}

      {state.description && <WotoManager />}

      {state.session?.sessionAttributes?.collabsize &&
        state.question.description && (
          <Alert
            message={`According to your Professor's collaboration policy, a maximum of ${state.course.sessionAttributes.collabsize} students can
              be in a Woto Room at a time.`}
            type="info"
          />
        )}

      {/* If they have submitted the question form*/}
      {state.question?.description && <CollabTable queueTime={25} />}
    </Col>
  );
};

export default SubmitQuestion;
