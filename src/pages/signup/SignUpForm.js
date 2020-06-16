import React from "react";
import { Form, Input, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";

/**
 * @MatthewSclar and @jaidharosenblatt
 *Component used on SignUpPage
 *Sign Up Form
 */

const SignUpForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical" style={{ width: "100%" }}>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please include your first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please include your first name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "Not a valid email",
          },
          {
            required: true,
            message: "Please input an email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input a password" }]}
      >
        <PasswordInput />
      </Form.Item>
      <Form.Item>
        <p style={{ marginTop: "20px", marginBottom: "8px" }}>
          Already have an account?
          <Link to="/signin"> Sign in </Link>
          here
        </p>
        <Button type="primary" block htmlType="submit">
          Get Started
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
