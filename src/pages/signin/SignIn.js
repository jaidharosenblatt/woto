import React from "react";
import { Form, Input, Button, Row } from "antd";
import { Link } from "react-router-dom";
import { Logo } from "../../static/Images";

/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    password: "${label} is not a validate password!",
  },
};

const SignIn = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row align="center">
        <img src={Logo} style={{ marginBottom: "16px" }} alt="Woto Logo" />
      </Row>
      <Row align="center">
        <Form
          name="nest-messages"
          layout="vertical"
          style={{ width: "450px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[{ message: "Please input your password!", required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <p>
            Don't have an account?
            <Link to={"/signup"}> Sign up here </Link>
          </p>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default SignIn;
