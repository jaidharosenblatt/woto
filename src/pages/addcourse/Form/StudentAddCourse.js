import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { Link } from "react-router-dom";
import API from "../../../api/API";
import "../addcourse.css";

/**
 * @MatthewSclar @jaidharosenblatt
 * Form for students to enroll in a new course
 * Makes a POST request to /courses/enroll with an inputted
 * verification key and handles errors. Upon a succesful enrol,
 * show the course that user has enrolled in and navigate back to home
 */

const AddCourseForm = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [courseInfo, setCourseInfo] = useState();
  const onFinish = async (values) => {
    setButtonDisabled(true);
    try {
      const res = await API.courseEnroll(values);
      setCourseInfo(res);
      console.log("Success:", res);
      setError("");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        setError("You are already enrolled in this course");
      } else {
        setError(
          "Invalid course code. Please contact your instructor to receive another code"
        );
      }
      setButtonDisabled(false);
      console.log("Failed:", error);
    }
  };

  return (
    <Space align="center" direction="vertical">
      <h2 className="header">
        {courseInfo
          ? `Enrolled in ${courseInfo.name} (${courseInfo.code})`
          : "Join a new course"}
      </h2>

      <Form onFinish={onFinish} layout="vertical">
        {!courseInfo && (
          <Form.Item
            label="Course Code"
            name="accessKey"
            help={error}
            validateStatus={error !== "" ? "error" : "validating"}
            colon={false}
          >
            <Input placeholder="Enter your 20 character code" />
          </Form.Item>
        )}
        {courseInfo ? (
          <Link to="/">
            <Button type="primary" block>
              Get Started
            </Button>
          </Link>
        ) : (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={buttonDisabled}
            >
              Join Course
            </Button>
          </Form.Item>
        )}
      </Form>
    </Space>
  );
};

export default AddCourseForm;
