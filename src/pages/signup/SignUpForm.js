import React from "react";
import { Form, Input, Button, Col, Row, Space } from "antd";
import { PasswordInput } from "antd-password-input-strength";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { Logo } from "../../static/Images";

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
    <div className="form">
      <Col>
        <Space direction="vertical" align="center">
          <img className="WotoLogo" src={Logo} alt="Woto Logo" />
          <h2 className="header">
            Be among the first to&nbsp;
            <b style={{ fontStyle: "bold", color: "#40a9ff" }}>
              revolutionize&nbsp;
            </b>
            office hours
          </h2>
        </Space>

        <Row>
          <Form onFinish={onFinish} layout="vertical" style={{ width: "100%" }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please include your first name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please include your first name" },
              ]}
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
              <Space>
                <p>
                  Already have an account?
                  <Link to="/signin"> Sign in </Link>
                  here
                </p>
              </Space>
              <Button
                style={{ marginTop: "8px" }}
                type="primary"
                block
                htmlType="submit"
              >
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
