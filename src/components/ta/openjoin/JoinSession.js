import React from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import util from "../../../util";
import LocationTimeTag from "../../sessions/header/LocationTimeTag";
import { connect } from "react-redux";
import { joinSession } from "../../../redux/courses/actions/ta";
import selectors from "../../../redux/selectors";

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 */
const JoinSession = (props) => {
  const { course, session, error } = props;

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
          <Form onFinish={props.joinSession} layout="vertical">
            <div className="icon-textbox">
              <VideoCameraOutlined />
              <Form.Item
                name="meetingURL"
                colon={false}
                initialValue={props.meetingURL}
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
              <Button
                loading={props.loading}
                type="primary"
                htmlType="submit"
                block
              >
                Join Session As{" "}
                {props.userIsInstructor ? "an Instructor" : "a TA"}
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
    loading: selectors.getLoading(state),
    session: selectors.getSession(state),
    error: selectors.getError(state),
    meetingURL: selectors.getUserMeetingURL(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

export default connect(mapStateToProps, { joinSession })(JoinSession);
