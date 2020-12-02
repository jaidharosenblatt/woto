import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./App.less";

import API from "./api/API";
import { AuthContext, actions } from "./contexts/AuthContext";

import { ContextProvider } from "./contexts/AuthContext";

import Help from "./pages/studenthelp/Help";
import AccountSettings from "./pages/accountsettings/AccountSettings";
import AddCourse from "./pages/addcourse/AddCourse";
import NavBar from "./components/navbar/NavBar";
import TAHelp from "./pages/tahelp/TAHelp";
import AdminContainer from "./pages/dashboard/AdminContainer";

import LoadingScreen from "./components/spinner/LoadingScreen";
import UnverifiedAccount from "./pages/verify/UnverifiedAccount";
import PageNotFound from "./pages/errors/PageNotFound";
import VerifiedSuccess from "./pages/verify/VerifiedSuccess";
import EmailAddCourse from "./pages/addcourse/EmailAddCourse";
import { connect } from "react-redux";
import authActions from "./redux/auth/actionCreators";
import coursesActions from "./redux/courses/";
import selectors from "./redux/selectors";
import SignedOutRoutes from "./routers/SignedOutRoutes";

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
 * Renders our app =D
 * Specify paths where navbar should be hidden otherwise
 * assumes that all pages will be wrapped in navbar
 * Uses styling from "App.less"
 */
const App = (props) => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    async function loadData() {
      await props.loadUser();
      await props.loadCourses();

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

    if (localStorage.getItem("token")) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <LoadingScreen loading={props.pageLoading}>
        <BrowserRouter>
          <Switch>
            <Route
              render={() => {
                return props.isAuthenticated ? (
                  <SignedInRoutes courses={props.courses} state={state} />
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
    isAuthenticated: selectors.getAuthenticationStatus(state),
  };
};

export default connect(mapStateToProps, { loadUser, loadCourses })(
  UnconnectedApp
);
