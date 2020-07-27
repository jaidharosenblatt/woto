import React from "react";
import { Form, Col, Button, Input } from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const styles = { icon: { fontSize: 20, marginRight: 8 } };

/**
 * @MatthewSclar @jaidharosenblatt open an existing session
 * @param {props} course course for this office hours
 * @param {props} session active session
 * @param {props} onSubmit callback to open session
 */
const OpenSessionForm = (props) => {
  return (
    <div className="open-session-form">
      <Col span={24}>
        <Form onFinish={props.onSubmit} layout="vertical">
          <div className="open-session-form-header">
            <h1>{props.course.code} Office Hours</h1>
            <h2>Join Active Session</h2>
          </div>

          <Form.Item>
            <div className="icon-textbox">
              <ClockCircleOutlined style={styles.icon} />
              <p>
                {props.session &&
                  `${props.session.startTime} - ${props.session.endTime}`}
              </p>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="icon-textbox">
              <EnvironmentOutlined style={styles.icon} />
              <p>{props.session && props.session.location}</p>
            </div>
          </Form.Item>

          <Form.Item
            name="zoomlink"
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
              Open Session
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};
export default OpenSessionForm;
