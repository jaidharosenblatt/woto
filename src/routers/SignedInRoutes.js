import React from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import selectors from "../redux/selectors";

import AccountSettings from "../pages/accountsettings/AccountSettings";
import AddCourse from "../pages/addcourse/AddCourse";
import NavBar from "../components/navbar/NavBar";
import UnverifiedAccount from "../pages/verify/UnverifiedAccount";
import PageNotFound from "../pages/errors/PageNotFound";
import VerifiedSuccess from "../pages/verify/VerifiedSuccess";
import EmailAddCourse from "../pages/addcourse/EmailAddCourse";
import AdminContainer from "../pages/dashboard/AdminContainer";
import SignedInContent from "./SignedInContent";

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = (props) => {
  const { user, courses, userType } = props;
  const routes = [
    <Route
      key="accountsettings"
      path="/accountsettings"
      component={AccountSettings}
    />,
    <Route key="verify" path="/verify" component={VerifiedSuccess} />,
    !user.verified && <Route key="unverified" component={UnverifiedAccount} />,
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
          if (userType === "instructor") {
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
      {userType !== "instructor" && <NavBar signedIn courses={courses} />}
      <Switch>
        {userType === "instructor" && (
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
              />
            );
          }}
        />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    userType: selectors.getUserType(state),
    user: selectors.getUser(state),
  };
};

export default connect(mapStateToProps)(SignedInRoutes);
