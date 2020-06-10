import React from "react";
import {
  Space,
  Form,
  Input,
  InputNumber,
  Button,
  Col,
  Checkbox,
  Row,
} from "antd";
//import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./SignInFormTwo.css";
import { Logo } from "../../../static/Images";

/**
 * @Tommy Tilton
 *Component used on SignUpPage
 *Sign Up Form
 */

const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

const SignInFormTwo = () => {
  return (
    
    <div className="signinformtwo">
      <Col>
        <Row align="center">
          <Col>
            
               <img src={Logo} alt="Woto Logo" />
          
          </Col>
        </Row>

        <Row align="center">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            labelCol={{ span: 24, offset: 0 }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                size="large"
                
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  type: "password",
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
               
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            Already have an account? <a href=""> Sign in here </a>
          </Form>
        </Row>
      </Col>
    </div>

  );
};

export default SignInFormTwo;
