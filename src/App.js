import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBarDecider";

const NavBarContainer = () => {
  return (
    <Layout>
      <NavBar signedIn />
      <div className="NavBarContainer">
        <Route path="/help" exact component={Help} />
        <Route path="/addcourse" exact component={AddCourse} />
      </div>
    </Layout>
  );
};

const NoNavBarContainer = () => {
  return (
    <div className="NoNavBarContainer">
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={["/signin", "/signup"]} component={NoNavBarContainer} />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
