import React from "react";
import { Space, Col, Card } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

// Takes in id to create seperate DOM elements for the two forms

const Content = ({ id }) => {
  return (
    <Space size="middle" direction="vertical" align="center">
      <Link to="/">
        <img src={Logo} alt="Woto Logo" />
      </Link>
      <h2>Sign in to Woto</h2>
      <SignInForm id={id} />
      <p>
        <Link to={"/forgot"}> Forgot password?</Link>
      </p>
      <p>
        Don't have an account?
        <Link to={"/signup"}> Sign up </Link>
      </p>
    </Space>
  );
};
const SignIn = () => {
  return (
    <div className="page-card-wrapper">
      <Space size={0} align="center">
        <Col xs={0} md={24}>
          <Card>
            <Content id="desktop-signin" />
          </Card>
        </Col>
        <Col xs={24} md={0}>
          <Content id="mobile-signin" />
        </Col>
      </Space>
    </div>
  );
};

export default SignIn;
