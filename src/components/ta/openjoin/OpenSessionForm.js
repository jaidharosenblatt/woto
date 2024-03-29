import React from "react";
import { Form, Button, Input, Tooltip } from "antd";
import {
  EnvironmentOutlined,
  VideoCameraOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TimeSelector from "./TimeSelector";
import { connect } from "react-redux";
import { editSession } from "../../../redux/courses/actions/ta";
import selectors from "../../../redux/selectors";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";

/**
 * @MatthewSclar @jaidharosenblatt create a new session
 * @param {props} onSubmit callback to open session
 * @param {props} CTA call to action for button (optional)
 * @param {Boolean} showSuccess to show success message from redux
 */
const OpenSessionForm = (props) => {
  const { CTA, maxWidth } = props;
  const { session } = props;

  const onSubmit = async (values) => {
    const { meetingURL, ...changes } = values;

    await props.editSession(changes, meetingURL);
    if (props.hideModal) {
      props.hideModal();
    }
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
          initialValue={props.meetingURL}
          rules={[
            {
              required: true,
              message: "Enter a Zoom Link to enter a session.",
            },
          ]}
        >
          <Input placeholder="Meeting Room URL" />
        </Form.Item>
        <Tooltip title="Please input a valid link to the virtual meeting room where you will be meeting with students">
          <QuestionCircleOutlined style={{ paddingLeft: "5px" }} />
        </Tooltip>
      </div>
      <ErrorSuccess showSuccess={props.showSuccess} />
      <Form.Item>
        <Button loading={props.loading} type="primary" htmlType="submit" block>
          {CTA ||
            `Open Session As 
          ${props.userIsInstructor ? "an Instructor" : "a TA"}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),

    session: selectors.getSession(state),
    userIsInstructor: selectors.userIsInstructor(state),
    meetingURL: selectors.getUserMeetingURL(state),
  };
};

export default connect(mapStateToProps, { editSession })(OpenSessionForm);
