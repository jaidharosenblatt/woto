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
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SignInForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className = "signinform">
    <Col>
      <Row align="center">
        <Col>
          <img src={Logo} alt="Woto Logo" />
        </Col>
      </Row>

      <Row align="center">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          labelCol={{ span: 24, offset: 0 }}
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input size="large" />
          </Form.Item>


          <Form.Item
            name={["user", "website"]}
            label="Password"
            rules={[{ type: "password", required: true }]}
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
