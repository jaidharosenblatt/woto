import React from "react";
import { Col, Card, Row, Space, Alert } from "antd";
import TeachingStaffCard from "../sessions/teaching-staff/TeachingStaffCard";
import Announcement from "../sessions/announcement/Announcement";
import AdjustableQuestion from "../sessions/helpform/AdjustableQuestion";
import HelpReady from "./helpready/HelpReady";
import QueueStatus from "./QueueStatus";
import { connect } from "react-redux";
import { useInterval } from "../ta/useInterval";
import selectors from "../../redux/selectors";
import {
  submitQuestion,
  loadQuestionSession,
} from "../../redux/courses/actions/student";
import YourQuestion from "../wotos/discussioncard/YourQuestion";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const ActiveSession = (props) => {
  const { session, loading, activeQuestion } = props;

  useInterval(async () => {
    props.loadQuestionSession();
  });

  return (
    <Col span={24}>
      <Row align="center">
        <Col span={24}>
          {session?.announcements?.map((item, key) => {
            return <Announcement key={key} announcement={item} />;
          })}
        </Col>
      </Row>
      <QueueStatus />
      {!activeQuestion?.description && (
        <Alert
          alert
          type="warning"
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}
      {/* If an assistant is helping them */}

      {activeQuestion?.assistant && <HelpReady />}
      {activeQuestion.description && <YourQuestion />}
      {!activeQuestion?.description && (
        <Card
          title={
            <Space direction="vertical">
              <h2>What's Your Question?</h2>
              <p>Please describe what you need help from a TA with</p>
            </Space>
          }
        >
          <AdjustableQuestion
            loading={loading}
            onFormSubmit={(description) => props.submitQuestion(description)}
            CTA="Submit Your Question"
          />
        </Card>
      )}
      {session?.staffers?.length > 0 && (
        <TeachingStaffCard staffers={session?.staffers} />
      )}
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    loading: selectors.getLoading(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps, {
  submitQuestion,
  loadQuestionSession,
})(ActiveSession);
