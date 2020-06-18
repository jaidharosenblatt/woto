import React from "react";
import { Form, Col, Row, InputNumber } from "antd";

import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";

import SchoolSelect from "./SchoolSelect";
import SegmentedControl from "../../../components/form/SegmentedControl";
import TextInputReq from "../../../components/form/TextInputReq";
import SubmitButton from "../../../components/form/SubmitButton";
import "./AddCourseForm.css";

const styles = { emphasize: { color: "#40a9ff" }, form: { width: "500px" } };
/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Uses: SchoolSelect, SegmentedControl, SubmitButton, TextInputReqs
 */

const CourseCodeInput = (
  <TextInputReq
    label="Course Code"
    name="course code"
    placeholder="ABC123"
    message="Please enter a Course Code"
  />
);

const InstitutionEmailInput = (
  <TextInputReq
    label="University Email"
    name="university email"
    placeholder="abc123@duke.edu"
    message="Please enter an email that corresponds to your selected Instituion"
  />
);

class AddCourseForm extends React.Component {
  constructor() {
    super();
    this.state = { role: "" };
  }

  handleOnChange = (event) => {
    if (event.target.name === "formcontroller") {
      if (event.target.value === "student") {
        this.setState({ role: "student" });
      }
      if (event.target.value === "teachingAssistant") {
        this.setState({ role: "teachingAssistant" });
      }
      if (event.target.value === "instructor") {
        this.setState({ role: "instructor" });
      }
    }
  };

  /**Eventually will make a network call upon selection of the school.
   *Called by the School Select component
   */
  OnSelectChange = (value) => {
    console.log("Selected:", value);
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
        <b style={styles.emphasize}>Welcome.&nbsp;</b>
        Lets get started.
      </h2>
    );

    //Set up for conditional rendering of Student and TA form
    if (
      this.state.role === "student" ||
      this.state.role === "teachingAssistant"
    ) {
      headerMessage = <h2 className="header">Join a class to begin.</h2>;

      form = (
        <div>
          <SchoolSelect onChange={this.OnSelectChange} />
          {InstitutionEmailInput}
          <Form.Item
            label="Graduation Year"
            name="graduation year"
            rules={[
              { required: true, message: "Please enter a Graduation Year" },
            ]}
          >
            <InputNumber min={2020} max={2300} placeholder="2020" />
          </Form.Item>

          {CourseCodeInput}
          <SubmitButton CTA="Join Course" />
        </div>
      );
    }

    //Set up for conditional rendering of instructor form
    if (this.state.role === "instructor") {
      headerMessage = (
        <h2 className="header">Create a class to get started.</h2>
      );

      form = (
        <div>
          <SchoolSelect onChange={this.OnSelectChange} />
          {InstitutionEmailInput}

          <TextInputReq
            label="Course Title"
            name="course title"
            placeholder="Intro to Compsci"
            message="Please enter a Course Title"
          />
          <Row>
            <Col xs={11}>{CourseCodeInput}</Col>

            <Col xs={11} offset={1}>
              <TextInputReq
                label="Section Code"
                name="section code"
                placeholder="3"
                message="Please enter a Section Code"
              />
            </Col>
          </Row>
          <SubmitButton CTA="Create Course" />
        </div>
      );
    }

    return (
      <div className="AddCourseForm">
        <Form
          style={styles.form}
          initialValues={{ role: "" }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          layout="vertical"
        >
          <Row align="center">
            <Col>
              <Link to="/">
                <img className="WotoLogo" src={Logo} alt="Woto Logo" />
              </Link>
            </Col>
          </Row>

          <Row align="center">{headerMessage}</Row>
          <SegmentedControl
            isVertical={this.state.role === ""}
            name="formcontroller"
            label="Who are you?"
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
                label: "Instructor",
                labelMobile: "Instructor",
                value: "instructor",
              },
            ]}
          />
          {form}
        </Form>
      </div>
    );
  }
}

export default AddCourseForm;
