import React from "react";
import { Route, Switch } from "react-router-dom";

import SignIn from "../user/signin/SignIn";
import SignUp from "../user/signup/SignUp";
import ForgotPassword from "../user/forgotpassword/ForgotPassword";
import NewPassword from "../user/forgotpassword/NewPassword";
import SignedOutNavBarContent from "./SignedOutNavBarContent";
import OauthRedirect from "../user/oauth/OauthRedirect";

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
      <Route path="/oauth/" render={(props) => <OauthRedirect {...props} />} />

      <Route component={SignedOutNavBarContent} />
    </Switch>
  );
};

export default SignedOutRoutes;
