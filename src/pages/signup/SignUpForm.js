import React from "react";
import { Space, Form, Input, InputNumber, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

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
            Be among the first to
            <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
              {" "}
              revolutionize{" "}
            </b>
            office hours
          </h2>
        </Row>

        <Row>
          <Form
            name="nest-messages"
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "100%" }}
          >
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
              name="password"
              label="Password"
              rules={[{ type: "password", required: true }]}
            >
              <Input.Password />
              <p style={{ marginTop: "4px" }}>Must be at least 6 characters</p>
            </Form.Item>
            <Form.Item>
              <Row>
                <p>
                  Already have an account? <Link to="/signin"> Sign in </Link>{" "}
                  here
                </p>
              </Row>

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
