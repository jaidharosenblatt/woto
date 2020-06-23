import React from "react";
import { Form, TimePicker, Row, Col } from "antd";

import { ClockImage, LocationImage, ZoomVideoImage } from "../../static/Images";
import TextInputReq from "../../components/form/TextInputReq";
import SubmitButton from "../../components/form/SubmitButton";
const { RangePicker } = TimePicker;

/**
 * @MatthewSclar Open Session Form
 */

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const OpenSessionForm = ({ courseName, activesession }) => {
  //Conditional rendering on button
  const button = activesession ? (
    <SubmitButton CTA="Join Session" />
  ) : (
    <SubmitButton CTA="Open Session" />
  );

  const time = activesession ? (
    <Form.Item name="range-picker" rules={[{ required: false }]}>
      <RangePicker
        use12Hours={true}
        minuteStep={15}
        format={"HH:mm"}
        disabled="true"
      />
    </Form.Item>
  ) : (
    <Form.Item
      name="range-picker"
      rules={[
        { required: true, message: "Please select the time of the session" },
      ]}
    >
      <RangePicker use12Hours={true} minuteStep={15} format={"HH:mm"} />
    </Form.Item>
  );

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <h1>
        <b style={{ color: "#40a9ff" }}>{courseName} Office Hours</b>
      </h1>
      <h2 style={{ color: "grey" }}>No Active Sessions</h2>
      <br />
      <h1 style={{ color: "black" }}>
        {" "}
        <b>Open a new Session</b>
      </h1>

      <Row align="center">
        <Col xs={3}>
          <img src={ClockImage} alt="clock" />
        </Col>
        <Col xs={21}>{time}</Col>
      </Row>
      <div>
        <Row align="center">
          <Col xs={3}>
            <img
              src={LocationImage}
              alt="location"
              style={{ position: "relative", bottom: "9px" }}
            />
          </Col>
          <Col xs={21}>
            <p style={{ position: "relative", bottom: "5px" }}>Virtual</p>
          </Col>
        </Row>
      </div>
      <Row align="center">
        <Col xs={3}>
          <img
            src={ZoomVideoImage}
            alt="video"
            style={{ width: "75%", position: "relative", top: "3px" }}
          />
        </Col>
        <Col xs={21}>
          <TextInputReq
            name="zoomlink"
            placeholder="duke.zoom.us/1234567890"
            message="Enter a Zoom Link to join a session."
          />
        </Col>
      </Row>

      {button}
    </Form>
  );
};
export default OpenSessionForm;
