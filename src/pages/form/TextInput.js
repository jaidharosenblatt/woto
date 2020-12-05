import React from "react";
import { Form, Input } from "antd";

/**
 * @jaidharosenblatt Simple input field with a placeholder and label
 * @param name name of the value to output
 */
const TextInput = ({ label, name, placeholder, required, message }) => {
  return (
    <Form.Item label={label} name={name} colon={false}>
      <Input
        placeholder={placeholder}
        rules={[{ required: required, message: message }]}
      />
    </Form.Item>
  );
};

export default TextInput;
