import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { logIn } from "../../api/API";

// TODO replace with network call
const onFinish = async (user) => {
  logIn(user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const styles = {
  form: { width: "100vw", maxWidth: "600px", padding: "16px" },
  footer: { marginBottom: "8px" },
};
/**
 * @tommytilton @jaidharosenblatt form prompting user
 * for their email and password
 */
const SignInForm = () => {
  return (
    <Form
      name="signin"
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

      <Form.Item style={styles.footer}>
        <Button type="primary" block htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
      <p>
        Don't have an account?
        <Link to={"/signup"}> Sign up here </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
