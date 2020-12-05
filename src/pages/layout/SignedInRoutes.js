import React from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import selectors from "../../redux/selectors";

import AccountSettings from "../user/accountsettings/AccountSettings";
import AddCourse from "../user/addcourse/AddCourse";
import UnverifiedAccount from "../user/verify/UnverifiedAccount";
import PageNotFound from "../util-components/errors/PageNotFound";
import VerifiedSuccess from "../user/verify/VerifiedSuccess";
import EmailAddCourse from "../user/addcourse/EmailAddCourse";
import pageMapInstructors from "./signed-in-content/pageMapInstructors";
import pageMapStudent from "./signed-in-content/pageMapStudent";
import { mapCoursesToPages } from "./signed-in-content/mapPages";

import { changeCourse } from "../../redux/current-course/actionCreators";

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = (props) => {
  const { user, courses } = props;

  const instructorPages = mapCoursesToPages(pageMapInstructors, courses);
  const studentPages = mapCoursesToPages(pageMapStudent, courses);
  const pages = props.userIsInstructor ? instructorPages : studentPages;

  return (
    <Switch>
      <Route key="verify" path="/verify" component={VerifiedSuccess} />
      {!user.verified && (
        <Route key="unverified" component={UnverifiedAccount} />
      )}
      {pages}
      {courses.length > 0 ? (
        <Route
          path={["/", "/signin", "/signup"]}
          exact
          component={() => {
            return <Redirect to={`/${courses[0]._id}/session`} />;
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
      <Route
        key="accountsettings"
        path="/accountsettings"
        component={AccountSettings}
      />
      <Route key="addcourse" path="/addcourse" exact component={AddCourse} />
      <Route key="enrollInstructor" path="/enroll" component={EmailAddCourse} />
      <Route key="404" component={PageNotFound} />
    </Switch>
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
