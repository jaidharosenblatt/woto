import React from "react";
import { Form, Col, Row, Space } from "antd";

import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";

import TextInputReq from "../../../components/form/TextInputReq";
import TextInput from "../../../components/form/TextInput";

import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css";
import GraduationYearInput from "../../../components/form/GraduationYearInput";
import DataSelect from "../../../components/form/DataSelect";
import UserTypeSegControl from "../../../components/form/UserTypeSegControl";

const styles = {
  emphasize: { color: "#40a9ff" },
};

const semesters = ["Summer 2020", "Fall 2020"];
/**
 * @MatthewSclar @jaidharosenblatt Form for adding a new course
 * Gets a list of schools and their properties to do validation
 * Conditionally renders depending on userType (student/TA/instructor)
 */

/**
 * @param {props} newUser if used in a new signup
 */
class AddCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userType: "student" };
  }

  handleUserTypeSelect = (event) => {
    this.setState({ userType: event.target.value });
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const newUser = this.props.newUser;

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
          <h2 className="header">Join a new course</h2>
          <Form
            style={styles.form}
            initialValues={{
              userType: this.state.userType,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            layout="vertical"
          >
            {this.state.userType === "instructor"
              ? instructorForm
              : studentTAForm}
          </Form>
        </Space>
      </div>
    );
  }
}

export default AddCourseForm;
