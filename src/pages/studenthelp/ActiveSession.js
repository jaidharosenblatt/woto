import React, { useContext } from "react";
import { Col, Card, Row, Space, Alert } from "antd";
import { HelpContext } from "./util/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";
import functions from "./util/functions";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import Announcement from "../../components/announcement/Announcement";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import WotoManager from "./wotos/WotoManager";
import QueueStatus from "./QueueStatus";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const ActiveSession = () => {
  const { state, dispatch } = useContext(HelpContext);
  const authContext = useContext(AuthContext);

  return (
    <Col span={24}>
      <Row align="center">
        <Col span={24}>
          {state.session?.announcements?.map((item, key) => {
            return <Announcement key={key} announcement={item} />;
          })}
        </Col>
      </Row>
      <QueueStatus />
      {!state.question.description && (
        <Alert
          alert
          type="warning"
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}
      {/* If an assistant is helping them */}

      {state.question?.assistant && <HelpReady />}
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
            questionForm={state.session.questionTemplate}
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
      {state.session?.staffers?.length > 0 && (
        <TeachingStaffCard staffers={state.session?.staffers} />
      )}
      {state.description && <WotoManager />}
    </Col>
  );
};

export default ActiveSession;
