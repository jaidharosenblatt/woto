import React from "react";
import { Form, Input } from "antd";

/**
 * @jaidharosenblatt Simple input field with a placeholder and label
 * @param name name of the value to output
 */
const QuestionInput = ({ label, name, placeholder }) => {
  return (
    <Form.Item label={label} name={name} colon={false}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default QuestionInput;
