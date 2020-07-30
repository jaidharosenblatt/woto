import React from "react";
import { Space } from "antd";
import { Logo } from "../../static/Images";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import PageCard from "../../components/centeredpage/PageCard";

const ForgotPassword = () => {
  return (
    <PageCard>
      <Space
        className="forgot"
        size="middle"
        direction="vertical"
        align="center"
      >
        <Link to="/">
          <img src={Logo} alt="Woto Logo" />
        </Link>
        <ForgotPasswordForm />
        <p>
          <Link to="/signin">Return to sign in</Link>
        </p>
      </Space>
    </PageCard>
  );
};

export default ForgotPassword;
