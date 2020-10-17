import React, { useContext } from "react";
import { Col, Card, Row, Space, Alert } from "antd";
import { CourseContext } from "./util/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import functions from "./util/functions";

import TeachingStaffCard from "../../components/teachingStaff/TeachingStaffCard";
import Announcement from "../../components/announcement/Announcement";
import AdjustableQuestion from "../../components/helpform/AdjustableQuestion";
import HelpReady from "../../components/tacomponents/helpready/HelpReady";
import WotoManager from "./wotos/WotoManager";
import QueueStatus from "./QueueStatus";
import { connect } from 'react-redux';
import { submitQuestion, select } from '../../ducks/courses';

/**
 * @jaidharosenblatt Page that allows users to work together in a help room
 * Takes in and can modify a question
 */
const ActiveSession = (props) => {
  const courseID = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const { course, session, loading, activeQuestion } = select(props.courses, courseID);

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
            questionForm={course?.questionTemplate}
            onFormSubmit={(description) => props.submitQuestion(courseID, authContext.state.user._id, description)}
            CTA="Submit Your Question"
          />
        </Card>
      )}
      {session?.staffers?.length > 0 && (
        <TeachingStaffCard staffers={session?.staffers} />
      )}
      {activeQuestion.description && <WotoManager />}
    </Col>
  );
};

const mapStateToProps = state => {
  return {
      courses: state.courses
  };
};

export default connect(mapStateToProps, {submitQuestion})(ActiveSession);
