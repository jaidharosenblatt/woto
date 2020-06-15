import React from "react";
import { Select, Form, Input, Col, Row, InputNumber } from "antd";

import SegmentedControlD from "./SegmentedControlD";
import { Logo } from "../../../static/Images";
import TextInput from "../../help/Form/TextInput";
import SubmitButton from "../../help/Form/SubmitButton";
import "./AddCourseForm.css";

const { Option } = Select;
/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Add Course Form
 */

class AddCourseForm extends React.Component {
  constructor() {
    super();
    this.state = { role: "" };
  }

  handleOnChange = (event) => {
    if (event.target.name === "formcontroller") {
      if (event.target.value === "Student") {
        this.setState({ role: "student" });
      }
      if (event.target.value === "teachingAssistant") {
        this.setState({ role: "teachingAssistant" });
      }
      if (event.target.value === "Teacher") {
        this.setState({ role: "teacher" });
      }
    }
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    var form = null;

    var headerMessage = (
      <h2 className="header">
        &nbsp;
        <b style={{ fontStyle: "bold", color: "#40a9ff" }}>Welcome.&nbsp;</b>
        Lets get started.
      </h2>
    );

    //Set up for conditional rendering of Student and TA form
    if (
      this.state.role === "student" ||
      this.state.role === "teachingAssistant"
    ) {
      headerMessage = (
        <h2 className="header">
          <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
            Join a class to begin.
          </b>
        </h2>
      );

      form = (
        <div>
          <Row>
            <Col xs={24}>
              <Form.Item
                label="Institution"
                name="institution"
                rules={[{ required: true }]}
              >
                <Select onChange={this.OnSelectChange}>
                  <Option value="Duke University"> Duke University </Option>
                  <Option value="UNC"> UNC </Option>
                  <Option value="North Carolina State"> NC State </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Year" name="year" rules={[{ required: true }]}>
            <InputNumber min={2020} max={2300} defaultValue={2021} />
          </Form.Item>

          <Row>
            <Col xs={24}>
              <Form.Item
                label="Course Code"
                name="course code"
                rules={[{ required: true }]}
              >
                <Input placeholder="ABC123" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <SubmitButton CTA="Join Course" />
            </Col>
          </Row>
        </div>
      );
    }

    //Set up for conditional rendering of teacher form
    if (this.state.role === "teacher") {
      headerMessage = (
        <h2 className="header">
          <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
            Create a class to get started.
          </b>
        </h2>
      );

      form = (
        <div>
          <Form.Item
            label="Institution"
            name="institution"
            rules={[{ required: true }]}
          >
            <Select onChange={this.OnSelectChange}>
              <Option value="Duke University"> Duke University </Option>
              <Option value="UNC"> UNC </Option>
              <Option value="North Carolina State"> NC State </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Course Title"
            name="course title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Intro to CompSci" />
          </Form.Item>

          <Row>
            <Col xs={11}>
              <Form.Item
                label="Course Code"
                name="course code"
                rules={[{ required: true }]}
              >
                <Input placeholder="ABC123" />
              </Form.Item>
            </Col>
            <Col xs={11} offset={1}>
              <Form.Item
                label="Section Code"
                name="section code"
                rules={[{ required: true }]}
              >
                <Input placeholder="3" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24}>
              <SubmitButton CTA="Create Course" />
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="AddCourseForm">
        <Form
          style={{ width: "450px" }}
          initialValues={{ role: "" }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          layout="vertical"
        >
          <Row align="center">
            <Col md={0}>
              <img src={Logo} alt="Woto Logo" />
            </Col>
          </Row>

          <Row align="center">{headerMessage}</Row>

          <Row align="center">
            <Col xs={24}>
              <SegmentedControlD
                name="formcontroller"
                label="I am a"
                onChange={this.handleOnChange}
                options={[
                  {
                    label: "Student",
                    labelMobile: "Student",
                    value: "student",
                  },
                  {
                    label: "Teaching Assistant",
                    labelMobile: "Assistant",
                    value: "teachingAssistant",
                  },
                  {
                    label: "Teacher",
                    labelMobile: "Teacher",
                    value: "teacher",
                  },
                ]}
              />
            </Col>
          </Row>
          {form}
        </Form>
      </div>
    );
  }
}

export default AddCourseForm;
