import React from "react";
import { Select, Form } from "antd";
import "../addcourse.css";
import VerticalSpace from "../../../util-components/vertical-space/VerticalSpace";
import SubmitButton from "../../../form/SubmitButton";
import TextInputReq from "../../../form/TextInputReq";
import { connect } from "react-redux";
import { addStudent } from "../../../../redux/courses/actions/roster";
import ErrorSuccess from "../../../util-components/error-success/ErrorSuccess";
import selectors from "../../../../redux/selectors";

/**
 * Add a single Duke student/TA to course
 * @param {Function} addStudent from redux
 * @param {Course} course
 */
const DukeStudentInput = ({ addStudent, course }) => {
  return (
    <VerticalSpace>
      <h2> Add a Student or Teaching Assistant to {course.name}</h2>
      <Form
        hideRequiredMark
        onFinish={addStudent}
        layout="vertical"
        initialValues={{ role: "student" }}
        style={{ width: "100%" }}
      >
        <TextInputReq
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
    </VerticalSpace>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};

export default connect(mapStateToProps, { addStudent })(DukeStudentInput);
