import React from "react";
import { Form, InputNumber } from "antd";

const GraduationYearInput = () => {
  return (
    <Form.Item
      label="Graduation Year"
      name="graduation year"
      rules={[{ required: true, message: "Please enter a Graduation Year" }]}
    >
      <InputNumber min={2020} max={2300} placeholder="2020" />
    </Form.Item>
  );
};

export default GraduationYearInput;
