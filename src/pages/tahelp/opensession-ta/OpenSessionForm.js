import React, { useContext } from "react";
import { Form, Col, Button, Input, Space, Card } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Hourglass } from "../../../static/Images";
import TimeSelector from "./TimeSelector";
import { AuthContext } from "../../../contexts/AuthContext";

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

            <div className="icon-textbox">
              <EnvironmentOutlined />
              <Form.Item
                name="location"
                initialValue="Virtual"
                colon={false}
                rules={[
                  {
                    required: true,
                    message: "Enter a location to enter a session.",
                  },
                ]}
              >
                <Input placeholder="Location" />
              </Form.Item>
            </div>

            <div className="icon-textbox">
              <VideoCameraOutlined />
              <Form.Item
                style={{ width: "100%" }}
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
