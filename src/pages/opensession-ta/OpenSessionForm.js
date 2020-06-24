import React from "react";
import { Form, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import { ClockImage, LocationImage, ZoomVideoImage } from "../../static/Images";
import TextInputReq from "../../components/form/TextInputReq";
import SubmitButton from "../../components/form/SubmitButton";
import TimeSelector from "./TimeSelector";

/**
 * @MatthewSclar Open Session Form
 */

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

class OpenSessionForm extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
    };
  }

  updateTime = (starttime, endtime) => {
    if (this.state.start === "") {
      this.setState({
        start: starttime,
        end: endtime,
      });
      this.formRef.current.setFieldsValue({
        start: this.state.start,
        end: this.state.end,
      });
    }
  };

  render() {
    //Conditional rendering on button

    return (
      <Form
        ref={this.formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <h1>
          <b style={{ color: "#40a9ff" }}>
            {this.props.courseName} Office Hours
          </b>
        </h1>
        <h2 style={{ color: "grey" }}>No Active Sessions</h2>
        <br />
        <Space direction="vertical">
          <h1 style={{ color: "black" }}>
            {" "}
            <b>Open a new Session</b>
          </h1>

          <Row align="left">
            <Col xs={3}>
              <img
                src={ClockImage}
                alt="Clock"
                style={{ width: "25px", position: "relative", top: "4px" }}
              />
            </Col>
            <Col xs={21}>
              <TimeSelector
                timeCallBack={this.updateTime}
                disabled={this.props.activesession}
              />
            </Col>
          </Row>
        </Space>

        <Row align="left">
          <Col xs={3}>
            <img
              src={LocationImage}
              alt="Location Pin"
              style={{ width: "20px", position: "relative", bottom: "9px" }}
            />
          </Col>
          <Col xs={21}>
            <p style={{ position: "relative", bottom: "7px" }}>Virtual</p>
          </Col>
        </Row>

        <Row align="left">
          <Col xs={3}>
            <img
              src={ZoomVideoImage}
              alt="Video Icon"
              style={{ width: "20px", position: "relative", top: "3px" }}
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
        {this.props.activesession ? (
          <SubmitButton CTA="Join Session" />
        ) : (
          <Link to="/duke/cs101">
            <SubmitButton CTA="Open Session" />
          </Link>
        )}
      </Form>
    );
  }
}
export default OpenSessionForm;
