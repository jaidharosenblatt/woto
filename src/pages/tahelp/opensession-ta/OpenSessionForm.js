import React from "react";
import { Form, Row, Col, Space, Button, Input } from "antd";
import { ClockImage, LocationImage, ZoomVideoImage } from "../../../static/Images";
import TextInputReq from "../../../components/form/TextInputReq";
import TimeSelector from "./TimeSelector";

/**
 * @MatthewSclar Open Session Form / Join Session Form
 */


const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

class OpenSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
    };
  }

  onFinish = (values) => {
    console.log("Success:", values);
    var functionr = this.props.activesession ? (this.props.joinSession) : (this.props.OpenSession)
    var param = {
      startTime: this.state.start,
      endTime: this.state.end,
      location: values.location
    }
    functionr(param);
  };


  updateStartTime = (start) => {
    this.setState({
      start: start
    });
    console.log(this.state.start);
  }
  updateEndTime = (end) => {
    this.setState({
      end: end
    });
    console.log(this.state.end);
  }
   updateTime = (starttime, endtime) => {
     if (this.state.start === "") {
       this.setState({
        start: starttime,
        end: endtime,
      });
    }
  };

  render() {
    var titletext = this.props.activesession ? ("Join Active Session") : ("Open a new Session");
    var undertext = this.props.activesession ? ("Active Session Available") : ("No Active Sessions");
    var rule = !this.props.activesession;

    return (
      <Form
        onFinish={this.onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <h1>
          <b style={{ color: "#40a9ff" }}>
            {this.props.courseName} Office Hours
          </b>
        </h1>
        <h2 style={{ color: "grey" }}>{undertext}</h2>
        <br />
        <Space direction="vertical">
          <h1 style={{ color: "black" }}>
            {" "}
            <b>{titletext}</b>
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
                start = {this.state.start}
                end = {this.state.end}
                setStart = {this.updateStartTime}
                setEnd = {this.updateEndTime}
              />
            </Col>
          </Row>
        </Space>

        <Row align="left">
          <Col xs={3}>
            <img
              src={LocationImage}
              alt="Location Pin"
              style={{ width: "20px"}}
            />
          </Col>

          <Col xs={21}>
          {this.props.activesession ?  (
            <Form.Item
              name="location"
              colon={false}
              rules={[{required: rule, message: "Enter a location to enter a session."}]}>
              <Input  value="Virtual"/>
            </Form.Item> ) : (
              <Form.Item
                name="location"
                colon={false}
                placeholder = "Virtual"
                rules={[{required: rule, message: "Enter a location to enter a session."}]}>
                <Input placeholder="Virtual" />
              </Form.Item>)}
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
          <Form.Item>
            <Button type="primary" htmlType="submit"  block>
              Join Session
            </Button>
          </Form.Item>
        ) : (
          <Form.Item>
            <Button  type="primary" htmlType="submit"  block>
              Open Session
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  }
}
export default OpenSessionForm;