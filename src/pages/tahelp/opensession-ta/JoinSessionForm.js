import React, { useContext } from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { convertDateString } from "../../../utilfunctions/timeAgo";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 * @param {props} course course for this office hours
 * @param {props} session active session
 * @param {props} onSubmit callback to open session
 */
const OpenSessionForm = (props) => {
  const { state } = useContext(AuthContext);
  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <h1>Join {props.course.code}'s Office Hours Session</h1>
            {props.session && (
              <LocationTimeTag
                location={props.session.location}
                time={`${convertDateString(
                  props.session.startTime
                )} - ${convertDateString(props.session.endTime)}`}
              />
            )}
          </div>
        }
      >
        <Col span={24}>
          <Form onFinish={props.onSubmit} layout="vertical">
            <div className="icon-textbox">
              <VideoCameraOutlined />
              <Form.Item
                name="meetingURL"
                colon={false}
                initialValue={state.user && state.user.meetingURL}
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
            {props.error && <p className="error"> {props.error}</p>}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Join Session As{" "}
                {state.userType === "instructor" ? "an Instructor" : "a TA"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </div>
  );
};
export default OpenSessionForm;
