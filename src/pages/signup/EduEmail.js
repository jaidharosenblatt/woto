import React from "react";
import { Form, Input } from "antd";
import SchoolSelect from "./SchoolSelect";

const EduEmail = () => {
  return (
    <Form.Item
      label="University Email"
      name="email"
      colon={false}
      rules={[
        {
          required: true,
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.edu$",
          message: `Please enter a .edu email`,
        },
      ]}
    >
      <Input placeholder="kyle.sobel@university.edu" />
    </Form.Item>
  );
};

export default EduEmail;
