import React from "react";
import { Form, Row, Col, Space, Button, Input } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";

import TimeSelector from "./TimeSelector";

/**
 * @MatthewSclar Open Session Form / Join Session Form
 */

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const styles = { icon: { fontSize: 20, marginRight: 8 } };

const OpenSessionForm = (props) => {
  return (
    <div className="open-session-form">
      <Col span={24}>
        <Form
          onFinish={props.joinSession}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <div className="open-session-form-header">
            <h1>{props.course.code} Office Hours</h1>
            <h3>No Active Sessions</h3>
            <h2>Open a New Session</h2>
          </div>

          <TimeSelector />

          <Form.Item
            name="location"
            colon={false}
            placeholder="Virtual"
            rules={[
              {
                required: true,
                message: "Enter a location to enter a session.",
              },
            ]}
          >
            <div className="icon-textbox">
              <EnvironmentOutlined style={styles.icon} />
              <Input placeholder="Virtual" />
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
