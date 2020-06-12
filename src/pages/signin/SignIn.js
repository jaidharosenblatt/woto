import React from "react";
import { Row, Space } from "antd";
import { Logo } from "../../static/Images";
import SignInForm from "./SignInForm";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

const SignIn = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Row align="center">
        <Space direction="vertical" align="center">
          <img src={Logo} alt="Woto Logo" />
          <h2>Welcome Back</h2>
        </Space>
      </Row>
      <Row align="center">
        <SignInForm />
      </Row>
    </div>
  );
};

export default SignIn;
