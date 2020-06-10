import React from "react";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";
import "./SignInForm.css";
import { Logo } from "../../../static/Images";

/**
 * @MatthewSclar
 *Component used on SignUpPage
 *Sign Up Form
 */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    password: "${label} is not a validate password!",
  },
};

const SignInForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signinform">
      <Col>
        <Row align="center">
          <Col>
            <img src={Logo} alt="Woto Logo" />
          </Col>
        </Row>

        <Row align="center">
          <Form
            name="nest-messages"
            labelCol={{ span: 24, offset: 0 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name={["user", "password"]}
              label="Password"
              rules={[{ message: "Please input your password!", required: true }]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
            Don't have an account? <a href=""> Sign up here </a>
          </Form>
        </Row>
      </Col>
    </div>
  );
};

export default SignInForm;
