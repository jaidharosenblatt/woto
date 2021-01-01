import React from "react";
import { Space } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import PageCard from "../../util-components/centeredpage/PageCard";
import DukeAuthButton from "../oauth/DukeAuthButton";
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
          <Logo />
        </Link>

        <DukeAuthButton />
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
