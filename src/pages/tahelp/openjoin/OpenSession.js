import React, { useContext } from "react";
import { Col, Space, Card } from "antd";
import { Hourglass } from "../../../static/Images";
import OpenSessionForm from "./OpenSessionForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import actions from "../../../redux/courses/actionCreators";
import selectors from "../../../redux/selectors";

/**
 * Wrap open session form in a card with a header
 */
const OpenSession = (props) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user._id;
  const { course } = props;
  const courseID = course?._id;

  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>Create a New Session</h1>
                <h3>{course?.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <OpenSessionForm
            onSubmit={(values) =>
              props.openSession(courseID, userID, values, values.meetingURL)
            }
          />
        </Col>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};

const { openSession } = actions;

export default connect(mapStateToProps, { openSession })(OpenSession);
