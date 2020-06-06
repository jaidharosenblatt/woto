import React from "react";
import { Form, Input } from "antd";

const QuestionInput = ({ label, name, placeholder }) => {
  return (
    <Form.Item label={label} name={name} colon={false}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default QuestionInput;
