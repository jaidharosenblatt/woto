import React from "react";
import { Divider } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import PageCard from "../../util-components/centeredpage/PageCard";
import DukeAuthButton from "../oauth/DukeAuthButton";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

// Takes in id to create seperate DOM elements for the two forms

const SignIn = () => {
  return (
    <PageCard>
      <VerticalSpace center>
        <Link to="/">
          <Logo />
        </Link>
        <h2>Sign in to Woto</h2>
        <DukeAuthButton text="Sign in as a Student with Duke Shibboleth" />
        <DukeAuthButton
          userType="instructor"
          text="Sign in as an Instructor with Duke Shibboleth"
        />

        <Divider>
          <h3>OR</h3>
        </Divider>
        <SignInForm />
        <p>
          <Link to={"/forgot"}> Forgot password?</Link>
        </p>
        <p>
          Don't have an account?
          <Link to={"/signup"}> Sign up </Link>
        </p>
      </VerticalSpace>
    </PageCard>
  );
};

export default SignIn;
