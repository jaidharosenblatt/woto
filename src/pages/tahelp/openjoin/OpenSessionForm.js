import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TimeSelector from "./TimeSelector";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} course course for this office hours
 * @param {props} session
 * @param {props} onSubmit callback to open session
 * @param {props} error error for onSubmit
 * @param {props} CTA call to action for button (optional)
 */
const OpenSessionForm = (props) => {
  const { state } = useContext(AuthContext);

  return (
    <Form
      style={{ maxWidth: props.maxWidth }}
      onFinish={props.onSubmit}
      layout="vertical"
    >
      <TimeSelector startTime={props.session && props.session.startTime} />

      <div className="icon-textbox">
        <EnvironmentOutlined />
        <Form.Item
          name="location"
          initialValue={(props.session && props.session.location) || "Virtual"}
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
      {props.error && <p className="error"> {props.error}</p>}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {props.CTA
            ? props.CTA
            : `Open Session As 
          ${state.userType === "instructor" ? "an Instructor" : "a TA"}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OpenSessionForm;
