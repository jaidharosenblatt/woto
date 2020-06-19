import React from "react";
import { Form, Col, Row } from "antd";

import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";

import SchoolSelect from "./SchoolSelect";
import SegmentedControl from "../../../components/form/SegmentedControl";
import TextInputReq from "../../../components/form/TextInputReq";
import SubmitButton from "../../../components/form/SubmitButton";
import "./AddCourseForm.css";
import GraduationYearInput from "./GraduationYearInput";
import ValidatedSchoolInput from "./ValidatedSchoolInput";
import DataSelect from "../../../components/form/DataSelect";

const styles = { emphasize: { color: "#40a9ff" }, form: { width: "500px" } };
/**
 * @MatthewSclar
 *Component used on Add Course Page
 *Uses: SchoolSelect, SegmentedControl, SubmitButton, TextInputReqs
 */

const schools = {
  duke: {
    name: "Duke University",
    semesters: ["Summer Session 2 2020", "Fall 2020"],
  },
  wustl: {
    name: "Washington University in St. Louis",
    semesters: ["Summer 2020", "Fall 2020"],
  },
  umich: {
    name: "University of Michigan",
    semesters: ["Summer 2020", "Fall 2020"],
  },
};

const CourseCodeInput = (
  <TextInputReq
    label="Course Code"
    name="course code"
    placeholder="ABC123"
    message="Please enter a Course Code"
  />
);

class AddCourseForm extends React.Component {
  constructor() {
    super();
    this.state = { role: "", school: "duke" };
  }

  handleRoleSelect = (event) => {
    this.setState({ role: event.target.value });
  };

  handleSchoolSelect = (value) => {
    this.setState({ school: value });
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const studentTAForm = (
      <div>
        <SchoolSelect schools={schools} onChange={this.handleSchoolSelect} />
        <ValidatedSchoolInput
          schools={schools}
          selectedSchool={this.state.school}
        />
        <GraduationYearInput />
        {CourseCodeInput}
        <SubmitButton CTA="Join Course" />
      </div>
    );

    const instructorForm = (
      <div>
        <SchoolSelect schools={schools} onChange={this.handleSchoolSelect} />
        <ValidatedSchoolInput
          schools={schools}
          selectedSchool={this.state.school}
        />
        <TextInputReq
          label="Course Title"
          name="course title"
          placeholder="Intro to Compsci"
          message="Please enter a course title"
        />
        <DataSelect
          required
          message="Please enter a term"
          name="term"
          label="Term"
          placeholder="Select the term of your course"
          options={schools[this.state.school].semesters}
        />
        <Row>
          <Col xs={12}>{CourseCodeInput}</Col>

          <Col xs={11} offset={1}>
            <TextInputReq
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

    //before role select
    var header = "Welcome. Lets get started";
    var form = null;

    // condtionally render based on selected roll
    if (this.state.role === "instructor") {
      header = "Create a class to get started.";
      form = instructorForm;
    }
    if (
      this.state.role === "student" ||
      this.state.role === "teachingAssistant"
    ) {
      header = "Join a class to begin.";
      form = studentTAForm;
    }

    return (
      <div className="AddCourseForm">
        <Form
          style={styles.form}
          initialValues={{
            role: this.state.role,
            institution: this.state.school,
          }}
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

          <Row align="center">
            <h2 className="header">{header}</h2>
          </Row>
          <SegmentedControl
            isVertical={this.state.role === ""}
            name="formcontroller"
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
          {form}
        </Form>
      </div>
    );
  }
}

export default AddCourseForm;
