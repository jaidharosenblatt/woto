import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import "./App.less";

import API from "./api/API";
import { AuthContext } from "./contexts/AuthContext";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Help from "./pages/studenthelp/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import SplashPage from "./pages/splash/SplashPage";
import TAHelp from "./pages/tahelp/TAHelp";
import About from "./pages/about/About";
import AdminContainer from "./pages/dashboard/AdminContainer";
import Playground from "./pages/Playground";
import { ContextProvider } from "./contexts/AuthContext";

import LoadingScreen from "./components/spinner/LoadingScreen";
import VerifyAccount from "./pages/verifyaccount/VerifyAccount";
import UnverifiedAccount from "./pages/verifyaccount/UnverifiedAccount";
import PageNotFound from "./pages/errors/PageNotFound";
import VerifiedSuccess from "./pages/verifyaccount/VerifiedSuccess";
import EmailAddCourse from "./pages/addcourse/EmailAddCourse";
import Footer from "./components/footer/Footer";

const RenderPage = ({ course }) => {
  if (course.role === "Student") {
    return <Help course={course} />;
  }
  return <TAHelp course={course} />;
};

const SignedInContent = ({ courses, state }) => {
  const user = state.user;
  return (
    <Switch>
      <Route path="/accountsettings" exact component={AccountSettings} />
      <Route path="/verify" component={VerifiedSuccess} />
      <Route
        path="/enroll/instructor"
        component={() => {
          return <EmailAddCourse userType="instructor" />;
        }}
      />
      <Route
        path="/enroll/student"
        component={() => {
          return <EmailAddCourse userType="student" />;
        }}
      />
      {!user.verified && (
        <Route
          component={() => {
            return <UnverifiedAccount />;
          }}
        />
      )}
      {state.userType === "instructor" && <Redirect to="/admin" />}

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
  );
};

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = ({ courses, state }) => {
  return (
    <Layout>
      <NavBar signedIn courses={courses} />
      <Switch>
        <Route path="/addcourse" exact component={AddCourse} />
        {state.userType === "instructor" && (
          <Route
            path="/admin"
            component={() => {
              return <AdminContainer courses={courses} />;
            }}
          />
        )}
        <Route
          component={() => {
            return (
              <div className="NavBarContainer">
                <SignedInContent courses={courses} state={state} />
              </div>
            );
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
      <Route path="/signup" component={SignUp} />
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
          <Route path="/about" exact component={About} />
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
      <Footer />
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
            type: "LOAD",
            payload: { user },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "LOGOUT" });
      }
    }
    async function loadCourses() {
      try {
        console.log(state.userType);

        const res = await API.getCourses(state.userType);
        console.log(res);
        //Sort courses by active session and then alphabetical by code
        res.sort((a, b) => {
          if (
            (a.activeSession && b.activeSession) ||
            (!a.activeSession && !b.activeSession)
          ) {
            return b.code > a.code ? 1 : -1;
          } else if (a.activeSession) {
            return -1;
          } else {
            return 1;
          }
        });

        setCourses(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    if (localStorage.getItem("token")) {
      setLoading(true);
      loadUser();
      loadCourses();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <LoadingScreen loading={loading}>
        <BrowserRouter>
          <Switch>
            <Route
              render={() => {
                return state.isAuthenticated ? (
                  <SignedInRoutes courses={courses} state={state} />
                ) : (
                  <SignedOutRoutes />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </LoadingScreen>
    </div>
  );
};

export default () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);
