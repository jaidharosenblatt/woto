import React from "react";
import { Form, Input } from "antd";
import { PasswordInput } from "antd-password-input-strength";
const PasswordWithConfirm = ({ required }) => {
  return (
    <>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: required, message: "Please input a password" }]}
      >
        <PasswordInput />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: required,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );
};

export default PasswordWithConfirm;
