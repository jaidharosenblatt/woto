import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import NewPasswordForm from "./NewPasswordForm";
import PageCard from "../../util-components/centeredpage/PageCard";

const NewPassword = () => {
  return (
    <PageCard>
      <Space size="middle" direction="vertical" align="center">
        <Link to="/">
          <Logo />
        </Link>
        <NewPasswordForm />
      </Space>
    </PageCard>
  );
};

export default NewPassword;
