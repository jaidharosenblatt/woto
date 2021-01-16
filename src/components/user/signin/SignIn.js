import React from "react";
import { Divider } from "antd";
import { Logo } from "../../../static/LoadedImages";
import { Link } from "react-router-dom";
import PageCard from "../../util-components/centeredpage/PageCard";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import StudentInstructorButtons from "../oauth/StudentInstructorButtons";
import SignInForm from "./SignInForm";

/**
 * @TommyTilton and @jaidharosenblatt
 * Component used on Signin page
 */

const SignIn = () => {
  return (
    <PageCard>
      <VerticalSpace centered>
        <Link to="/">
          <Logo />
        </Link>
        <h2>Welcome Back</h2>
        <p>Sign in using Duke Shibboleth</p>

        <StudentInstructorButtons />
        <Divider style={{ flexDirection: "row" }}>
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
