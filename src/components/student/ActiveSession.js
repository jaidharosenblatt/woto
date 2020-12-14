import React from "react";
import { Col, Card, Row, Space, Alert, Tooltip } from "antd";
import Announcement from "../course/announcement/Announcement";
import AdjustableQuestion from "../course/helpform/AdjustableQuestion";
import BeingHelped from "./BeingHelped";
import QueueStatus from "./QueueStatus";
import { connect } from "react-redux";
import { useInterval } from "../ta/useInterval";
import selectors from "../../redux/selectors";
import {
  submitQuestion,
  loadQuestionSession,
} from "../../redux/courses/actions/student";
import YourQuestion from "../wotos/discussioncard/YourQuestion";
import util from "../../util";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const ActiveSession = (props) => {
  const {
    courseID,
    session,
    loading,
    activeQuestion,
    stats,
    questions,
  } = props;
  const wotoPrompt = util.getWotoPrompt(
    activeQuestion.description,
    stats.valueMap,
    questions.length
  );

  const history = useHistory();

  useInterval(async () => {
    // props.loadQuestionSession();
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

      {activeQuestion?.assistant ? <BeingHelped /> : <QueueStatus />}

      {!activeQuestion?.description && (
        <Alert
          alert
          type="warning"
          message={
            "You will not be seen by a TA until you submit your question"
          }
        />
      )}

      {wotoPrompt && activeQuestion?.description && !activeQuestion?.assistant && (
        <Alert
          alert
          type="info"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/courses/${courseID}/woto`)}
          message={
            <>
              {`${wotoPrompt}. Try working with them in a Woto Room  `}
              <Tooltip title="A video room for you to collaborate with peers">
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          }
        />
      )}
      {/* If an assistant is helping them */}

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
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    loading: selectors.getLoading(state),
    stats: selectors.getStats(state),
    questions: selectors.getQuestions(state),
    courseID: selectors.getCourseID(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps, {
  submitQuestion,
  loadQuestionSession,
})(ActiveSession);
