import React, { useContext } from "react";
import { Form, Col, Button, Input, Card } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import { convertDateString } from "../../../utilfunctions/timeAgo";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import { AuthContext } from "../../../contexts/AuthContext";

const styles = { icon: { fontSize: 20, marginRight: 8 } };

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 * @param {props} course course for this office hours
 * @param {props} session active session
 * @param {props} onSubmit callback to open session
 */
const OpenSessionForm = (props) => {
  const { state } = useContext(AuthContext);
  console.log(state);
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
            <Form.Item
              name="meetingURL"
              colon={false}
              rules={[
                {
                  required: true,
                  message: "Enter a Zoom Link to enter a session.",
                },
              ]}
            >
              <div className="icon-textbox">
                <VideoCameraOutlined style={styles.icon} />
                <Input placeholder="duke.zoom.us/1234567890" />
              </div>
            </Form.Item>

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
