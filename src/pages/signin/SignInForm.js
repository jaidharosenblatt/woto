import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

// TODO replace with network call
const onFinish = (values) => {
  console.log(values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const styles = { form: { width: "450px" }, footer: { marginBottom: "8px" } };
/**
 * @tommytilton @jaidharosenblatt form prompting user
 * for their email and password
 */
const SignInForm = () => {
  return (
    <Form
      name="nest-messages"
      layout="vertical"
      style={styles.form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your Email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your Password" }]}
      >
        <Input.Password />
      </Form.Item>
      <p style={styles.footer}>
        Don't have an account?
        <Link to={"/signup"}> Sign up here </Link>
      </p>
      <Form.Item>
        <Button type="primary" block htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
