import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { Link } from "react-router-dom";
import API from "../../../api/API";
import "../addcourse.css";

/**
 * @MatthewSclar
 * Form for instructors to join in a preexisting course
 * Will eventually make a POST request to add an instructor to a course
 */

const AddCourseForm = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const [courseInfo, setCourseInfo] = useState();

  const onFinish = async (values) => {
    setButtonDisabled(true);
    //INPUT CODE FOR API CALL TO ADD INSTRUCTOR TO A COURSE
  };

  return (
    <Space align="center" direction="vertical">
      <h2 className="header">
        {courseInfo
          ? `Enrolled in ${courseInfo.name} (${courseInfo.code})`
          : "Join an existing course as an instructor"}
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
