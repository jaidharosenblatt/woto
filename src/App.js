import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./App.less";

import API from "./api/API";
import { AuthContext, actions } from "./contexts/AuthContext";
import { CoursesContext } from "./contexts/CoursesContext";

import { ContextProvider } from "./contexts/AuthContext";

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

import LoadingScreen from "./components/spinner/LoadingScreen";
import VerifyAccount from "./pages/verify/VerifyAccount";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import UnverifiedAccount from "./pages/verify/UnverifiedAccount";
import PageNotFound from "./pages/errors/PageNotFound";
import VerifiedSuccess from "./pages/verify/VerifiedSuccess";
import EmailAddCourse from "./pages/addcourse/EmailAddCourse";
import Footer from "./components/footer/Footer";
import NewPassword from "./pages/forgotpassword/NewPassword";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Guidelines from "./pages/legal/Guidelines";
import { connect } from "react-redux";
import authActions from "./redux/auth/actionCreators";
import coursesActions from "./redux/courses/";
import selectors from "./redux/selectors";

const RenderPage = ({ course }) => {
  if (course.role === "TA") {
    return <TAHelp course={course} />;
  }
  return <Help course={course} />;
};

const SignedInContent = ({ courses, routes, redirects }) => {
  return (
    <div className="NavBarContainer">
      <Switch>
        {routes}
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
        {redirects}
      </Switch>
    </div>
  );
};

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = ({ courses, state }) => {
  const routes = [
    <Route
      key="accountsettings"
      path="/accountsettings"
      component={AccountSettings}
    />,
    <Route key="verify" path="/verify" component={VerifiedSuccess} />,
    !state.user.verified && (
      <Route key="unverified" component={UnverifiedAccount} />
    ),
    <Route key="addcourse" path="/addcourse" exact component={AddCourse} />,
    <Route key="enrollInstructor" path="/enroll" component={EmailAddCourse} />,
  ];

  const redirects = [
    courses.length > 0 ? (
      <Route
        key="redirectcourse"
        path={["/", "/signin", "/signup"]}
        exact
        component={() => {
          if (state.userType === "instructor") {
            return <Redirect to={`/${courses[0]._id}/session`} />;
          } else {
            return <Redirect to={`/${courses[0]._id}`} />;
          }
        }}
      />
    ) : (
      <Route
        key="redirectaddcourse"
        path={["/", "/signin", "/signup"]}
        exact
        component={() => {
          return <Redirect to={"/addcourse"} />;
        }}
      />
    ),
    <Route key="404" component={PageNotFound} />,
  ];

  return (
    <Layout>
      {state.userType !== "instructor" && <NavBar signedIn courses={courses} />}
      <Switch>
        {state.userType === "instructor" && (
          <Route
            component={() => {
              return (
                <AdminContainer
                  redirects={redirects}
                  routes={routes}
                  courses={courses}
                />
              );
            }}
          />
        )}
        <Route
          component={() => {
            return (
              <SignedInContent
                redirects={redirects}
                routes={routes}
                courses={courses}
                state={state}
              />
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
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/newpassword" component={NewPassword} />

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

/**
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadUser() {
      props.loadUser();

      try {
        const user = await API.loadUser();
        if (user != null) {
          dispatch({
            type: actions.LOAD,
            payload: { user },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.LOGOUT });
      }
    }
    async function loadCourses() {
      props.loadCourses();

      try {
        const res = await API.getCourses();
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

        //filter courses "res" so that only using active courses
        const activeCourses = res.filter((item) => item.archived !== true);
        setCourses(activeCourses);
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("token")) {
      loadUser();
      loadCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <LoadingScreen loading={props.pageLoading}>
        <CoursesContext.Provider value={{ courses, setCourses }}>
          <BrowserRouter>
            <Switch>
              <Route
                render={() => {
                  return state.isAuthenticated ? (
                    <SignedInRoutes courses={props.courses} state={state} />
                  ) : (
                    <SignedOutRoutes />
                  );
                }}
              />
            </Switch>
          </BrowserRouter>
        </CoursesContext.Provider>
      </LoadingScreen>
    </div>
  );
};

const UnconnectedApp = (props) => (
  <ContextProvider>
    <App {...props} />
  </ContextProvider>
);

const { loadUser } = authActions;
const { loadCourses } = coursesActions;
const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    pageLoading: selectors.getPageLoading(state),
  };
};

export default connect(mapStateToProps, { loadUser, loadCourses })(
  UnconnectedApp
);
