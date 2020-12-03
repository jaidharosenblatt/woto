import React from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import selectors from "../redux/selectors";

import AccountSettings from "../pages/accountsettings/AccountSettings";
import AddCourse from "../pages/addcourse/AddCourse";
import UnverifiedAccount from "../pages/verify/UnverifiedAccount";
import PageNotFound from "../pages/errors/PageNotFound";
import VerifiedSuccess from "../pages/verify/VerifiedSuccess";
import EmailAddCourse from "../pages/addcourse/EmailAddCourse";
import AdminContainer from "./layout/Container";
import SignedInContent from "./SignedInContent";
import { changeCourse } from "../redux/current-course/actionCreators";

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = (props) => {
  const { user, courses } = props;
  console.log(props);
  return (
    <Layout>
      <Switch>
        <Route key="verify" path="/verify" component={VerifiedSuccess} />
        {!user.verified && (
          <Route key="unverified" component={UnverifiedAccount} />
        )}
        {courses.length > 0 ? (
          <Route
            key="redirectcourse"
            path={["/", "/signin", "/signup"]}
            exact
            component={() => {
              console.log("yooo");
              props.changeCourse(courses[0]._id);
              return <Redirect to={`/${courses[0]._id}/session`} />;
            }}
          />
        ) : (
          <Route
            key="redirectaddcourse"
            path={["/", "/signin", "/signup"]}
            exact
            component={() => {
              console.log("asdasd");

              return <Redirect to={"/addcourse"} />;
            }}
          />
        )}
        <Route component={AdminContainer} />
        <Route
          key="accountsettings"
          path="/accountsettings"
          component={AccountSettings}
        />
        <Route key="addcourse" path="/addcourse" exact component={AddCourse} />
        <Route
          key="enrollInstructor"
          path="/enroll"
          component={EmailAddCourse}
        />
        <Route key="404" component={PageNotFound} />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    userType: selectors.getUserType(state),
    user: selectors.getUser(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

export default connect(mapStateToProps, { changeCourse })(SignedInRoutes);
