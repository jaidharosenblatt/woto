import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
import { EnvironmentOutlined, VideoCameraOutlined } from "@ant-design/icons";
import TimeSelector from "./TimeSelector";
import { AuthContext } from "../../../contexts/AuthContext";
import { connect } from "react-redux";
import actions from "../../../redux/courses";
import selectors from "../../../redux/selectors";

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} onSubmit callback to open session
 * @param {props} CTA call to action for button (optional)
 */
const OpenSessionForm = (props) => {
  const { CTA, maxWidth } = props;
  const auth = useContext(AuthContext);
  const { error, session } = props;
  const user = auth.state.user;

  const onSubmit = (values) => {
    props.editSession(values, values.meetingURL);
  };

  return (
    <Form
      style={{ maxWidth: maxWidth, margin: 8 }}
      onFinish={CTA ? onSubmit : props.onSubmit}
      layout="vertical"
    >
      <TimeSelector startTime={session?.startTime} endTime={session?.endTime} />

      <div className="icon-textbox">
        <EnvironmentOutlined />
        <Form.Item
          name="location"
          initialValue={session?.location || "Virtual"}
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
          initialValue={user?.meetingURL}
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
      {error && <p className="error"> {error}</p>}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {CTA ||
            `Open Session As 
          ${auth?.state.userType === "instructor" ? "an Instructor" : "a TA"}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    course: selectors.getCourse(state),
    error: selectors.getError(state),
    session: selectors.getSession(state),
  };
};
const { editSession } = actions;

export default connect(mapStateToProps, { editSession })(OpenSessionForm);
