import React from "react";
import { Col, Space, Card } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./forgot.css";

const ForgotPassword = () => {
  const content = (
    <Space className="forgot" size="middle" direction="vertical" align="center">
      <Link to="/">
        <img src={Logo} alt="Woto Logo" />
      </Link>
      <ForgotPasswordForm />
      <p>
        <Link to="/signin">Return to sign in</Link>
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

export default ForgotPassword;
