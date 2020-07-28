import React, { useContext } from "react";
import { Form, Col, Button, Input, Space, Card } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Hourglass } from "../../../static/Images";
import TimeSelector from "./TimeSelector";
import { AuthContext } from "../../../contexts/AuthContext";

const styles = { icon: { fontSize: 20, marginRight: 8 } };

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} course course for this office hours
 * @param {props} onSubmit callback to open session
 */
const OpenSessionForm = (props) => {
  const { state } = useContext(AuthContext);
  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>Create a New Session</h1>
                <h3>{props.course.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <Form onFinish={props.onSubmit} layout="vertical">
            <TimeSelector />

            <Form.Item
              name="location"
              initialValue="shit"
              colon={false}
              rules={[
                {
                  required: true,
                  message: "Enter a location to enter a session.",
                },
              ]}
            >
              <div className="icon-textbox">
                <EnvironmentOutlined style={styles.icon} />
                <Input placeholder="Location" />
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
                <Input placeholder="Meeting Room URL" />
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Open Session As{" "}
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
