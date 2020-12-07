import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import PageCard from "../../util-components/centeredpage/PageCard";

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
          <Logo />
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
