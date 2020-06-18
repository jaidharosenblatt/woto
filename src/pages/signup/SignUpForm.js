import React from "react";
import { Form, Input, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";

/**
 * @MatthewSclar and @jaidharosenblatt
 * first stage of signup process where the user creates their
 * profile (name, email, password)
 */

const styles = {
  form: { width: "100%" },
  footer: { marginTop: "20px", marginBottom: "8px" },
};

const SignUpForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical" style={styles.form}>
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
        <Button type="primary" block htmlType="submit" style={styles.footer}>
          Get Started
        </Button>
        <p>
          Already have an account?
          <Link to="/signin"> Sign in </Link>
          here
        </p>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
