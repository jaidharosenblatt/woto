import React from "react";
import { Form, Input } from "antd";

/**
 * @Matthew Simple input REQUIRED field with a placeholder, label, and message
 * @param name name of the value to output
 */
const TextInputReq = ({ label, name, placeholder, message }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      colon={false}
      rules={[{ required: true, message: { message } }]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default TextInputReq;
