import React, { useContext } from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { convertTimeString } from "../../../utilfunctions/timeAgo";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import { AuthContext } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import redux from "../../../redux/courses";
import { CourseContext } from "../util/CourseContext";

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 */
const JoinSession = (props) => {
  const auth = useContext(AuthContext);
  const courseID = useContext(CourseContext);
  const userID = auth.state.user?._id;
  const state = redux.select(props.courses, courseID);

  const handleSubmit = async (values) => {
    props.joinSession(courseID, userID);
  };

  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <h1>Join {state.course.code}'s Office Hours Session</h1>
            {state.session && (
              <LocationTimeTag
                location={state.session.location}
                time={`${convertTimeString(
                  state.session.startTime
                )} - ${convertTimeString(state.session.endTime)}`}
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
            {state.message?.error && (
              <p className="error"> {state.message?.error}</p>
            )}
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

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

export default connect(redux.mapStateToProps, redux)(JoinSession);
