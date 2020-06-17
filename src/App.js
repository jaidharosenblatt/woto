import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import Dashboard from "./pages/dashboard/Home";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import GettingHelp from "./pages/gettinghelp/GettingHelp";

import AddCourse from "./pages/addcourse/AddCourse";
import "./App.less";
import NavBar from "./components/NavBar/NavBar";

import OpenSession from "./pages/opensession-ta/OpenSession";
const courses = ["cs330", "cs250", "cs101"];

const NavBarContainer = () => {
  return (
    <Layout>
      <NavBar signedIn />
      <div className="NavBarContainer">
        <Route exact path="/">
          <Redirect to={`/${courses[0]}`} />
        </Route>
        {courses.map((course) => {
          return (
            <Route
              key={course}
              exact
              path={`/${course}`}
              component={() => <Help course={course} />}
            />

          );
        })}
        <Route path="/help" exact component={Help} />
        <Route path="/accountsettings" exact component={AccountSettings} />
        <Route path="/opensession-ta" exact component={OpenSession} />
        <Route path="/gettinghelp" exact component={GettingHelp} />
      </div>
    </Layout>
  );
};

const NoNavBarContainer = () => {
  return (
    <div className="NoNavBarContainer">
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/addcourse" exact component={AddCourse} />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path={["/signin", "/signup", "/dashboard", "/addcourse"]}
            component={NoNavBarContainer}
          />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
