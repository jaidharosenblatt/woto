import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import SignedOutNavbar from "./navbar/SignedOutNavbar";
import SplashPage from "../splash/SplashPage";
import About from "../splash/about/About";
import VerifyAccount from "../user/verify/VerifyAccount";
import Footer from "./footer/Footer";
import Terms from "../splash/legal/Terms";
import Privacy from "../splash/legal/Privacy";
import Guidelines from "../splash/legal/Guidelines";

/**
 * Renders as a part of signed out routes. Render pages with a navbar and in a container.
 * Redirects to "/" when no defined route is found
 */
const SignedOutNavBarContent = () => {
  return (
    <Layout>
      <SignedOutNavbar />
      <div className="signed-out-container">
        <Switch>
          <Route path="/" exact component={SplashPage} />
          <Route path="/about" exact component={About} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/guidelines" exact component={Guidelines} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/verify" component={VerifyAccount} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </Layout>
  );
};

export default SignedOutNavBarContent;
