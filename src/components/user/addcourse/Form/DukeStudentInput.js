import React from "react";
import { Select, Form } from "antd";
import "../addcourse.css";
import SubmitButton from "../../../form/SubmitButton";
import TextInputReq from "../../../form/TextInputReq";
import TextInput from "../../../form/TextInput";

import { connect } from "react-redux";
import { addStudent } from "../../../../redux/courses/actions/roster";
import ErrorSuccess from "../../../util-components/error-success/ErrorSuccess";

/**
 * Add a single Duke student/TA to course
 * @param {Function} addStudent from redux
 */
const DukeStudentInput = (props) => {
  return (
    <Form
      onFinish={props.addStudent}
      layout="vertical"
      hideRequiredMark
      initialValues={{ role: "student" }}
      style={{ width: "100%" }}
    >
      <TextInput
        message="Please provide a name"
        label="Name"
        name="name"
        placeholder="Kyle Sobel"
      />
      <TextInputReq
        message="Please provide a netId"
        label="NetId"
        name="netId"
        placeholder="abc123"
      />
      <Form.Item name="role" label="Role">
        <Select>
          <Select.Option value="student">Student</Select.Option>
          <Select.Option value="TA">Teaching Assistant</Select.Option>
        </Select>
      </Form.Item>
      <ErrorSuccess />
      <SubmitButton CTA="Add Student" />
    </Form>
  );
};

export default connect(null, { addStudent })(DukeStudentInput);
