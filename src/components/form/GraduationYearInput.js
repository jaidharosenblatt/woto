import React from "react";
import { Form, InputNumber } from "antd";

const GraduationYearInput = () => {
  return (
    <Form.Item
      label="Graduation Year"
      name="graduationYear"
      rules={[{ required: true, message: "Please input your graduation year" }]}
    >
      <InputNumber min={2020} max={2300} placeholder="2020" />
    </Form.Item>
  );
};

export default GraduationYearInput;
