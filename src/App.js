import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import Demo from "./pages/DEMO-MATT/demo";

import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import AdminContainer from "./pages/dashboard/AdminContainer";
/**
 * @jaidharosenblatt
 * Process for adding a new page
 * 1) Create new component in "/pages"
 * 2) Import page above
 * 3) Add as new Route (and think of a path to the page) to either NavBarContainer or NoNavBarContainer
 * 4) If NoNavBarContainer, then add path to first Route in App function
 */

import OpenSession from "./pages/opensession-ta/OpenSession";
const courses = ["cs330", "cs250", "cs101"];

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
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
        <Route path="/demo" exact component={Demo} />
      </div>
    </Layout>
  );
};

// Creates routes to pages that do not have navbar
const NoNavBarContainer = () => {
  return (
    <div className="NoNavBarContainer">
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/addcourse" exact component={AddCourse} />
    </div>
  );
};

/**
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={["/admin"]} component={AdminContainer} />
          <Route
            path={["/signin", "/signup", "/addcourse"]}
            component={NoNavBarContainer}
          />
          <Route component={NavBarContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
