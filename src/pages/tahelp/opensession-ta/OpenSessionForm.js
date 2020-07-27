import React from "react";
import { Form, Col, Button, Input, Space } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Hourglass } from "../../../static/Images";
import LocationTimeTag from "../../../components/header/LocationTimeTag";
import TimeSelector from "./TimeSelector";

const styles = { icon: { fontSize: 20, marginRight: 8 } };

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} course course for this office hours
 * @param {props} onSubmit callback to open session
 */
const OpenSessionForm = (props) => {
  return (
    <div className="open-session-form">
      <Col span={24}>
        <Form onFinish={props.onSubmit} layout="vertical">
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>{props.course.code} Office Hours</h1>
                <LocationTimeTag time="No Active Sessions" />
              </div>
            </Space>
          </div>

          <Form.Item>
            <h2>Open a New Session</h2>
          </Form.Item>

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
