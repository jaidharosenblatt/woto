import React from "react";
import { Form, Input } from "antd";
import "./form.css";
const EduEmail = ({ school, required }) => {
  const schoolRegex = `^[A-Za-z0-9._%+-]+@${school}$`;
  // if (!school) school = null;
  return (
    <Form.Item
      label="University Email"
      name="email"
      colon={false}
      rules={[
        {
          required: required,
          pattern: schoolRegex,
          message: school
            ? `Please enter a ${school} email`
            : "Please include input your email",
        },
      ]}
    >
      <Input
        disabled={!school}
        placeholder={!school ? "kyle@university.edu" : `first.last@${school}`}
      />
    </Form.Item>
  );
};

export default EduEmail;
