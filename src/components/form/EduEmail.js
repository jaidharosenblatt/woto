import React from "react";
import { Form, Input } from "antd";
import "./form.css";
const EduEmail = ({ school }) => {
  const schoolRegex = `^[A-Za-z0-9._%+-]+@${school}.edu$`;
  // if (!school) school = null;
  return (
    <Form.Item
      label="University Email"
      name="email"
      colon={false}
      rules={[
        {
          required: true,
          pattern: schoolRegex,
          message: school
            ? `Please enter a ${school}.edu email`
            : "Please include input your email",
        },
      ]}
    >
      <Input
        disabled={!school}
        placeholder={
          !school ? "kyle@university.edu" : `first.last@${school}.edu`
        }
      />
    </Form.Item>
  );
};

export default EduEmail;
