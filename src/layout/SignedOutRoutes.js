import React from "react";
import { Route, Switch } from "react-router-dom";

import SignIn from "../pages/user/signin/SignIn";
import SignUp from "../pages/user/signup/SignUp";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import NewPassword from "../pages/forgotpassword/NewPassword";
import SignedOutNavBarContent from "./SignedOutNavBarContent";

/**
 * Render pages when user is signed out. Specifies pages that will not include
 * a navbar otherwise render SignedOutNavBarContent routes with a navbar
 */
const SignedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/newpassword" component={NewPassword} />

      <Route component={SignedOutNavBarContent} />
    </Switch>
  );
};

export default SignedOutRoutes;
