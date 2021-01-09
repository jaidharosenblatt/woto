import React from "react";
import { Form, Input, Space } from "antd";

/**
 * @Matthew Simple input REQUIRED field with a placeholder, label, and message
 * @param name name of the value to output
 */
const TextInputReq = ({ label, name, placeholder, message }) => {
  return (
    <Form.Item
      label={
        <Space size={2}>
          {label}
          <span style={{ color: "#FF4D50" }}> *</span>
        </Space>
      }
      name={name}
      colon={false}
      rules={[{ required: true, message: { message } }]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default TextInputReq;
