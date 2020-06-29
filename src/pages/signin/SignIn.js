import React from "react";
import { Row, Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import "./SignIn.css";
import SignInForm from "./SignInForm";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

const SignIn = () => {
  return (
    <div className="sign-in-wrapper">
      <div>
        <Row align="center">
          <Space direction="vertical" align="center">
            <Link to="/">
              <img src={Logo} alt="Woto Logo" />
            </Link>
            <h2>Welcome Back</h2>
          </Space>
        </Row>
        <Row align="center" className="sign-in">
          <SignInForm />
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
