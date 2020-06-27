import React from "react";
import { Form, Input } from "antd";

const EduEmail = ({ school }) => {
  const schoolRegex = `^[A-Za-z0-9._%+-]+@${school}.edu$`;

  return (
    <Form.Item
      label="University Email"
      name="email"
      colon={false}
      rules={[
        {
          required: true,
          pattern: schoolRegex,
          message: `Please enter a ${school}.edu email`,
        },
      ]}
    >
      <Input
        disabled={!school}
        placeholder={!school ? "kyle@university.edu" : `abc123@${school}.edu`}
      />
    </Form.Item>
  );
};

export default EduEmail;
