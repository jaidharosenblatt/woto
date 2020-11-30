import React, { useContext } from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import util from "../../../util";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import { AuthContext } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import actions from "../../../redux/courses/actionCreators";
import selectors from "../../../redux/selectors";

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 */
const JoinSession = (props) => {
  const auth = useContext(AuthContext);
  const userID = auth.state.user?._id;
  const { course, session, error } = props;
  const courseID = course?._id;

  const handleSubmit = async () => {
    props.joinSession(courseID, userID);
  };

  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <h1>Join {course.code}'s Office Hours Session</h1>
            {session && (
              <LocationTimeTag
                location={session.location}
                time={`${util.convertTimeString(
                  session.startTime
                )} - ${util.convertTimeString(session.endTime)}`}
              />
            )}
          </div>
        }
      >
        <Col span={24}>
          <Form onFinish={handleSubmit} layout="vertical">
            <div className="icon-textbox">
              <VideoCameraOutlined />
              <Form.Item
                name="meetingURL"
                colon={false}
                initialValue={auth.state.user?.meetingURL}
                rules={[
                  {
                    required: true,
                    message: "Enter a Zoom Link to enter a session.",
                  },
                ]}
              >
                <Input placeholder="Meeting Room URL" />
              </Form.Item>
            </div>
            {error && <p className="error"> {error}</p>}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Join Session As{" "}
                {auth.state.userType === "instructor"
                  ? "an Instructor"
                  : "a TA"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
    error: selectors.getError(state),
  };
};

const { joinSession } = actions;

export default connect(mapStateToProps, { joinSession })(JoinSession);
