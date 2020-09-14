import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TimeSelector from "./TimeSelector";
import { AuthContext } from "../../../contexts/AuthContext";
import { TAHelpContext } from "../util/TAHelpContext";

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} onSubmit callback to open session
 * @param {props} CTA call to action for button (optional)
 */
const OpenSessionForm = ({ onSubmit, CTA, maxWidth }) => {
  const auth = useContext(AuthContext);
  const { state } = useContext(TAHelpContext);

  return (
    <Form
      style={{ maxWidth: maxWidth, margin: 8 }}
      onFinish={onSubmit}
      layout="vertical"
    >
      <TimeSelector
        startTime={state?.session?.startTime}
        endTime={state?.session?.endTime}
      />

      <div className="icon-textbox">
        <EnvironmentOutlined />
        <Form.Item
          name="location"
          initialValue={state?.session?.location || "Virtual"}
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
          initialValue={auth.state?.user?.meetingURL}
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
      {state?.message?.error && (
        <p className="error"> {state?.message?.error}</p>
      )}
      <Form.Item>
        <p style={{ color: "#008000", width: "50%" }}>
          {state?.message?.success}
        </p>
        <Button type="primary" htmlType="submit" block>
          {CTA ||
            `Open Session As 
          ${auth?.state.userType === "instructor" ? "an Instructor" : "a TA"}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OpenSessionForm;
