import React, { useContext } from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { convertTimeString } from "../../../utilfunctions/timeAgo";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import { AuthContext } from "../../../contexts/AuthContext";
import { TAHelpContext } from "../util/TAHelpContext";
import functions from "../util/functions";

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 */
const JoinSession = ({ state, joinSession }) => {
  const auth = useContext(AuthContext);
  const courseID = state.course._id;
  const userID = auth.state.user?._id;

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(courseID);
    console.log(userID);
    joinSession(courseID, userID);
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
export default JoinSession;
