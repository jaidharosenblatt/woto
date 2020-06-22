import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/help/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import Demo from "./pages/DEMO-MATT/demo";

import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import SplashPage from "./pages/splash/SplashPage";
import TAHelp from "./pages/tahelp/TAHelp";
import AdminContainer from "./pages/dashboard/AdminContainer";
import Playground from "./pages/Playground";
import OpenSession from "./pages/opensession-ta/OpenSession";

/**
 * @jaidharosenblatt
 * Process for adding a new page
 * 1) Create new component in "/pages"
 * 2) Import page above
 * 3) Add as new Route (and think of a path to the page) to either NavBarContainer or NoNavBarContainer
 * 4) If NoNavBarContainer, then add path to first Route in App function
 */

// Temporary array of courses to create pages (replace with network call)
const courses = {
  cs330: { name: "CS330", institution: "duke", active: true, role: "student" },
  cs250: { name: "CS250", institution: "duke", active: false, role: "student" },
  cs101: { name: "CS101", institution: "duke", active: true, role: "ta" },
};

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const NavBarContainer = () => {
  return (
    <Layout>
      <NavBar signedIn />
      <div className="NavBarContainer">
        <Route path="/" exact component={SplashPage} />
        {Object.keys(courses).map((course) => {
          return (
            <Route
              key={course}
              exact
              path={`/${courses[course].institution}/${course}`}
              component={() => {
                if (courses[course].role === "student") {
                  return <Help course={courses[course]} />;
                }
                if (courses[course].role === "ta") {
                  return <TAHelp course={courses[course]} />;
                }
              }}
            />
          );
        })}
        <Route path="/help" exact component={Help} />
        <Route path="/accountsettings" exact component={AccountSettings} />
        <Route path="/duke/opensession-ta" exact component={OpenSession} />
        <Route path="/demo" exact component={Demo} />
        <Route path="/playground" exact component={Playground} />
      </div>
    </Layout>
  );
};

const SignedOutNavBarContainer = () => {
  return (
    <Layout>
      <NavBar />
      <div className="NavBarContainer">
        <Route path="/" exact component={SplashPage} />
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
      <Route
        path="/signup/addcourse"
        exact
        component={() => {
          return <AddCourse newUser />;
        }}
      />
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
          <Route exact path={["/"]} component={SignedOutNavBarContainer} />
          <Route path={["/admin"]} component={AdminContainer} />
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
