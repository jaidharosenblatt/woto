import React from "react";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";
import { Logo } from "../../static/Images";

/**
 * @MatthewSclar
 *Component used on SignUpPage
 *Sign Up Form
 */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
    password: "${label} is not a validate password!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SignUpForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="form">
      <Col>
        <Row align="center">
          <Col md={0}>
            <img src={Logo} alt="Woto Logo" />
          </Col>
        </Row>
        <Row align="center">
          <h2 className="header">
            Be among the first to{" "}
            <b style={{ fontStyle: "bold", color: "#40a9ff" }}>revolutionize</b>{" "}
            office hours
          </h2>
        </Row>

        <Row>
          <Form name="nest-messages" onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="graduationYear"
              label="Graduation Year"
              rules={[{ type: "number", min: 2000, max: 2350, required: true }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ type: "password", required: true }]}
            >
              <Input.Password />
              Must be at least 6 characters
            </Form.Item>

            <Form.Item>
              Already have an account? <a href=""> Sign in </a> here
              <Button type="primary" block htmlType="submit">
                Get Started
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </div>
  );
};

export default SignUpForm;
