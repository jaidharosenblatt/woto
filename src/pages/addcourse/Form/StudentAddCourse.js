import React from "react";
import { Form } from "antd";

import API from "../../../api/API";
import TextInputReq from "../../../components/form/TextInputReq";
import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css";

/**
 * @MatthewSclar @jaidharosenblatt Form for adding a new course
 * Gets a list of schools and their properties to do validation
 * Conditionally renders depending on userType (student/TA/instructor)
 */

const AddCourseForm = () => {
  const onFinish = async (values) => {
    try {
      const res = await API.courseEnroll(values);
      console.log("Success:", res);
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <TextInputReq
        label="Course Code"
        name="accessKey"
        placeholder="ABC123"
        message="Please enter a course code"
      />
      <SubmitButton CTA="Join Course" />
    </Form>
  );
};

export default AddCourseForm;
