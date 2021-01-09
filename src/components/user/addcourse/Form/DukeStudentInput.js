import React from "react";
import { Form, Space } from "antd";
import "../addcourse.css";
import SubmitButton from "../../../form/SubmitButton";
import TextInputReq from "../../../form/TextInputReq";
import TextInput from "../../../form/TextInput";

import { connect } from "react-redux";
import { addStudent } from "../../../../redux/courses/actions/roster";

/**
 * Add a single Duke student/TA to course
 * @param {Function} addStudent from redux
 * @param
 */
const DukeStudentInput = (props) => {
  const roleName = props.isStudent ? "Student" : "Assistant";

  const onFinish = async (student) => {
    const role = props.isStudent ? "student" : "TA";
    const studentWithRole = { ...student, role };
    await props.addStudent(studentWithRole);
  };
  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      hideRequiredMark
      style={{ width: "100%" }}
    >
      <Space align="end">
        <TextInput
          message="Please provide a name"
          name="name"
          placeholder="Name"
        />
        <TextInputReq
          message="Please provide a netId"
          name="netId"
          placeholder="Duke NetId"
        />

        <SubmitButton CTA={"Add " + roleName} />
      </Space>
    </Form>
  );
};

export default connect(null, { addStudent })(DukeStudentInput);
