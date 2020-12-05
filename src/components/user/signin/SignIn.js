import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/Images";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import PageCard from "../../util-components/centeredpage/PageCard";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

// Takes in id to create seperate DOM elements for the two forms

const SignIn = () => {
  return (
    <PageCard>
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
    </PageCard>
  );
};

export default SignIn;
