import React from "react";
import { Form, Input, Button, Row } from "antd";
import { Link } from "react-router-dom";
import { Logo } from "../../static/Images";

/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

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
