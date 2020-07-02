import React from "react";
import { Form, Col, Row } from "antd";

import TextInputReq from "../../../components/form/TextInputReq";
import TextInput from "../../../components/form/TextInput";

import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css";
import DataSelect from "../../../components/form/DataSelect";

const semesters = ["Summer 2020", "Fall 2020"];
/**
 * @MatthewSclar @jaidharosenblatt Form for adding a new course
 * Gets a list of schools and their properties to do validation
 * Conditionally renders depending on userType (student/TA/instructor)
 */

const AddCourseForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
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
    </Form>
  );
};

export default AddCourseForm;
