import React from "react";
import { Form, Input, Button, Space } from "antd";
import { useHistory } from "react-router-dom";
import "../addcourse.css";
import selectors from "../../../../redux/selectors";
import { courseEnroll } from "../../../../redux/sorted-courses/actionCreators";

import { connect } from "react-redux";
import { setSuccessMessage } from "../../../../redux/status/actionCreators";
/**
 * @MatthewSclar @jaidharosenblatt
 * Form for students to enroll in a new course
 * Makes a POST request to /courses/enroll with an inputted
 * verification key and handles errors. Upon a succesful enrol,
 * show the course that user has enrolled in and navigate back to home
 */

const AddCourseForm = (props) => {
  const { error, course, loading, success } = props;
  const history = useHistory();

  const startCourse = () => {
    // clear success message
    props.setSuccessMessage(undefined);

    // direct to newly added course
    history.push(`/courses/${course._id}/session`);
  };

  return (
    <Space align="center" direction="vertical">
      <h2>
        {success
          ? `Enrolled in ${course.name} (${course.code})`
          : "Join a new course"}
      </h2>

      <Form
        onFinish={({ accessKey }) => props.courseEnroll(accessKey)}
        layout="vertical"
      >
        {!success && (
          <Form.Item
            label="Course Code"
            name="accessKey"
            help={error}
            validateStatus={error ? "error" : "validating"}
            colon={false}
          >
            <Input placeholder="Enter your course code" />
          </Form.Item>
        )}
        {success ? (
          <Button type="primary" block onClick={startCourse}>
            Get Started
          </Button>
        ) : (
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Join Course
            </Button>
          </Form.Item>
        )}
      </Form>
    </Space>
  );
};

const mapStateToProps = (state, prevState) => {
  return {
    ...prevState,
    loading: selectors.getLoading(state),
    error: selectors.getError(state),
    success: selectors.getSuccessMessage(state),
    course: selectors.getCourse(state),
  };
};

export default connect(mapStateToProps, { courseEnroll, setSuccessMessage })(
  AddCourseForm
);
