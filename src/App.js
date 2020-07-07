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
import { ContextProvider } from "./contexts/AuthContext";

import LoadingScreen from "./components/spinner/LoadingScreen";
import VerifyAccount from "./pages/verifyaccount/VerifyAccount";
import UnverifiedAccount from "./pages/verifyaccount/UnverifiedAccount";
import PageNotFound from "./pages/errors/PageNotFound";

const RenderPage = ({ course }) => {
  if (course.role === "Student") {
    return <Help course={course} />;
  }
  return <TAHelp course={course} />;
};

const SignedInContent = ({ courses, user }) => {
  return (
    <div className="NavBarContainer">
      <Switch>
        <Route path="/accountsettings" exact component={AccountSettings} />

        {!user.verified && (
          <Route
            component={() => {
              return <UnverifiedAccount />;
            }}
          />
        )}
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
        {courses.length > 0 ? (
          <Route
            path={["/", "/signin", "/signup"]}
            exact
            component={() => {
              return <Redirect to={`/${courses[0]._id}`} />;
            }}
          />
        ) : (
          <Route
            path={["/", "/signin", "/signup"]}
            exact
            component={() => {
              return <Redirect to={"/addcourse"} />;
            }}
          />
        )}

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = ({ courses, user }) => {
  return (
    <Layout>
      <NavBar signedIn courses={courses} />
      <Switch>
        <Route path="/addcourse" exact component={AddCourse} />
        <Route
          component={() => {
            return <SignedInContent courses={courses} user={user} />;
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
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await API.loadUser();
        if (user != null) {
          console.log(user);
          dispatch({
            type: "LOGIN",
            payload: { user },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "LOGOUT" });
      }
    }
    loadUser();
  }, [state.isAuthenticated, state.userType, dispatch, state.user.verified]);

  useEffect(() => {
    setLoading(true);
    async function loadCourses() {
      try {
        const res = await API.getCourses(state.userType);
        setCourses(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (state.isAuthenticated) {
      loadCourses();
    }
    setLoading(false);
  }, [state.isAuthenticated, state.userType]);

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
                  return state.isAuthenticated ? (
                    <SignedInRoutes courses={courses} user={state.user} />
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
