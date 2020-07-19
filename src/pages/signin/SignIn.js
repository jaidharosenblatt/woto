import React from "react";
import { Col, Space, Card } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import "./SignIn.css";
import SignInForm from "./SignInForm";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

const SignIn = () => {
  const content = (
    <Space size="middle" direction="vertical" align="center">
      <Link to="/">
        <img src={Logo} alt="Woto Logo" />
      </Link>
      <h2>Sign in to Woto</h2>
      <SignInForm />
      <p>
        <Link to={"/forgot"}> Forgot password?</Link>
      </p>
      <p>
        Don't have an account?
        <Link to={"/signup"}> Sign up </Link>
      </p>
    </Space>
  );
  return (
    <div className="sign-in-wrapper">
      <Space size={0} align="center">
        <Col xs={0} md={24}>
          <Card>{content}</Card>
        </Col>
        <Col xs={24} md={0}>
          {content}
        </Col>
      </Space>
    </div>
  );
};

export default SignIn;
