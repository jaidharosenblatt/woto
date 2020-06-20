import React from "react";
import { Form, Col, Row, Space } from "antd";

import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";

import SegmentedControl from "../../../components/form/SegmentedControl";
import TextInputReq from "../../../components/form/TextInputReq";
import TextInput from "../../../components/form/TextInput";

import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css";
import GraduationYearInput from "./GraduationYearInput";
import DataSelect from "../../../components/form/DataSelect";

const styles = {
  emphasize: { color: "#40a9ff" },
};

const semesters = ["Summer 2020", "Fall 2020"];
/**
 * @MatthewSclar @jaidharosenblatt Form for adding a new course
 * Gets a list of schools and their properties to do validation
 * Conditionally renders depending on role (student/TA/instructor)
 */

/**
 * @param {props} newUser if used in a new signup
 */
class AddCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: "student" };
  }

  handleRoleSelect = (event) => {
    this.setState({ role: event.target.value });
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const newUser = this.props.newUser;

    var header = "";
    if (this.state.role !== "instructor") {
      if (newUser) {
        header = "Join a course to begin";
      } else {
        header = "Join a new course";
      }
    }
    if (this.state.role === "instructor") {
      if (newUser) {
        header = "Create a course to get started";
      } else {
        header = "Create a new course";
      }
    }

    const studentTAForm = (
      <div>
        {newUser ? <GraduationYearInput /> : null}
        <TextInputReq
          label="Course Code"
          name="courseCode"
          placeholder="ABC123"
          message="Please enter a course code"
        />
        <SubmitButton CTA="Join Course" />
      </div>
    );

    const instructorForm = (
      <div>
        <TextInputReq
          label="Course Title"
          name="courseTitle"
          placeholder="Intro to Compsci"
          message="Please enter a course title"
        />
        <DataSelect
          required
          message="Please enter a term"
          name="term"
          label="Term"
          placeholder="Select the term of your course"
          options={semesters}
        />
        <Row>
          <Col xs={12}>
            <TextInputReq
              label="Course Number"
              name="courseNumber"
              placeholder="CS101"
              message="Please enter a course code"
            />
          </Col>

          <Col xs={11} offset={1}>
            <TextInput
              label="Section Code"
              name="sectionCode"
              placeholder="3"
              message="Please enter a section code"
            />
          </Col>
        </Row>
        <SubmitButton CTA="Create Course" />
      </div>
    );

    return (
      <div className="AddCourseForm">
        <Space align="center" direction="vertical">
          <Link to="/">
            <img className="WotoLogo" src={Logo} alt="Woto Logo" />
          </Link>
          <h2 className="header">{header}</h2>
          <Form
            style={styles.form}
            initialValues={{
              role: this.state.role,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            layout="vertical"
          >
            <SegmentedControl
              isVertical={this.state.role === ""}
              name="role"
              label="Who are you?"
              onChange={this.handleRoleSelect}
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
            {this.state.role === "instructor" ? instructorForm : studentTAForm}
          </Form>
        </Space>
      </div>
    );
  }
}

export default AddCourseForm;
