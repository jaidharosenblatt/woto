import React from "react";
import { Form, Input, Button, Space } from "antd";
import { Link, Redirect } from "react-router-dom";
import "../addcourse.css";
import selectors from "../../../../redux/selectors";
import { courseEnroll } from "../../../../redux/sorted-courses/actionCreators";

import { connect } from "react-redux";
/**
 * @MatthewSclar @jaidharosenblatt
 * Form for students to enroll in a new course
 * Makes a POST request to /courses/enroll with an inputted
 * verification key and handles errors. Upon a succesful enrol,
 * show the course that user has enrolled in and navigate back to home
 */

const AddCourseForm = (props) => {
  const { error, course, loading } = props;

  return (
    <Space align="center" direction="vertical">
      {course && <Redirect to={`/${course._id}`} />}
      <h2>
        {course
          ? `Enrolled in ${course.name} (${course.code})`
          : "Join a new course"}
      </h2>

      <Form onFinish={props.courseEnroll} layout="vertical">
        {!course && (
          <Form.Item
            label="Course Code"
            name="accessKey"
            help={error}
            validateStatus={error ? "error" : "validating"}
            colon={false}
          >
            <Input placeholder="Enter your 20 character code" />
          </Form.Item>
        )}
        {course ? (
          <Link to="/">
            <Button type="primary" block>
              Get Started
            </Button>
          </Link>
        ) : (
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
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
  };
};

export default connect(mapStateToProps, { courseEnroll })(AddCourseForm);
