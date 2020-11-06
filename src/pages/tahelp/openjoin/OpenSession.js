import React, { useContext } from "react";
import { Col, Space, Card } from "antd";
import { Hourglass } from "../../../static/Images";
import OpenSessionForm from "./OpenSessionForm";
import { TAHelpContext } from "../util/TAHelpContext";
import functions from "../util/functions";
import { AuthContext } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import { select, openSession } from "../../../ducks/courses";
import { CourseContext } from "../util/CourseContext";

/**
 * Wrap open session form in a card with a header
 */
const OpenSession = (props) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const courseID = useContext(CourseContext);
  const state = select(props.courses, courseID);

  const openSession = (values) => {
    props.openSession(courseID, userID, values, values.meetingURL);
  };
  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>Create a New Session</h1>
                <h3>{state.course?.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <OpenSessionForm onSubmit={openSession} />
        </Col>
      </Card>
    </div>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

export default connect(mapStateToProps, { openSession })(OpenSession);
