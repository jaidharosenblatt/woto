import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import API from "./api/API";
import { AuthContext } from "./contexts/AuthContext";
import { LoadingContext } from "./contexts/LoadingContext";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/studenthelp/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import SplashPage from "./pages/splash/SplashPage";
import TAHelp from "./pages/tahelp/TAHelp";
import AdminContainer from "./pages/dashboard/AdminContainer";
import Playground from "./pages/Playground";
import OpenSession from "./pages/opensession-ta/OpenSession";
import { ContextProvider } from "./contexts/AuthContext";

import LoadingScreen from "./components/spinner/LoadingScreen";
import VerifyAccount from "./pages/verifyaccount/VerifyAccount";
import PageNotFound from "./pages/errors/PageNotFound";

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
  cs330: {
    name: "CS330",
    institution: "duke",
    active: true,
    userType: "student",
  },
  cs250: {
    name: "CS250",
    institution: "duke",
    active: false,
    userType: "student",
  },
  cs101: { name: "CS101", institution: "duke", active: true, userType: "ta" },
};

const RenderPage = ({ course }) => {
  if (course.role === "Student") {
    return <Help course={course} />;
  }
  if (course.role === "Ta") {
    return <TAHelp course={course} />;
  }
};

const SignedInContent = ({ courses }) => {
  return (
    <div className="NavBarContainer">
      <Switch>
        {courses.map((course) => {
          return (
            <Route
              key={course._id}
              exact
              path={`/${course._id}`}
              component={() => <RenderPage course={course} />}
            />
          );
        })}
        <Route path="/accountsettings" exact component={AccountSettings} />
        <Route path="/duke/cs101/open" exact component={OpenSession} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = ({ courses }) => {
  return (
    <Layout>
      <NavBar signedIn courses={courses} />
      <Switch>
        <Route path="/addcourse" exact component={AddCourse} />
        <Route
          component={() => {
            return <SignedInContent courses={courses} />;
          }}
        />
      </Switch>
    </Layout>
  );
};

/**
 * Render pages when user is signed out. Specifies pages that will not include
 * a navbar otherwise render SignedOutNavBarContent routes with a navbar
 */
const SignedOutRoutes = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/playground" exact component={Playground} />
      <Route component={SignedOutNavBarContent} />
    </Switch>
  );
};

/**
 * Renders as a part of signed out routes. Render pages with a navbar and in a container.
 * Redirects to "/" when no defined route is found
 */
const SignedOutNavBarContent = () => {
  return (
    <Layout>
      <NavBar />
      <div className="signed-out-container">
        <Switch>
          <Route path="/" exact component={SplashPage} />
          <Route
            path="/verify/student"
            component={() => {
              return <VerifyAccount userType="student" />;
            }}
          />
          <Route
            path="/verify/instructor"
            component={() => {
              return <VerifyAccount userType="instructor" />;
            }}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Layout>
  );
};

/**
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = () => {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const res = await API.getStudentCourses();
      setCourses(res);
    }
    getCourses();
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await API.loadUser();
        if (user != null) {
          context.dispatch({
            type: "LOGIN",
            payload: { user },
          });
          console.log(user);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        context.dispatch({ type: "LOGOUT" });
      }
    }
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.isAuthenticated]);
  return (
    <div className="App">
      <LoadingContext.Provider
        value={{ state: loading, setLoading: setLoading }}
      >
        <LoadingScreen loading={loading}>
          <BrowserRouter>
            <Switch>
              <Route
                render={() => {
                  return context.state.isAuthenticated ? (
                    <SignedInRoutes courses={courses} />
                  ) : (
                    <SignedOutRoutes />
                  );
                }}
              />
              <Route path={["/admin"]} component={AdminContainer} />
            </Switch>
          </BrowserRouter>
        </LoadingScreen>
      </LoadingContext.Provider>
    </div>
  );
};

export default () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);
