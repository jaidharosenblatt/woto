import React from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import selectors from "../../redux/selectors";

import AccountSettings from "../user/accountsettings/AccountSettings";
import AddCourse from "../user/addcourse/AddCourse";
import PageNotFound from "../util-components/errors/PageNotFound";
import VerifiedSuccess from "../user/verify/VerifiedSuccess";
import EmailAddCourse from "../user/addcourse/EmailAddCourse";
import pageMapInstructors from "./signed-in-content/pageMapInstructors";
import pageMapStudent from "./signed-in-content/pageMapStudent";
import { mapCoursesToPages } from "./signed-in-content/mapPages";

/**
 * Routes to pages wrapped in a navbar.
 * Redirects "/" to the first course in courses array
 */
const SignedInRoutes = (props) => {
  const instructorPages = mapCoursesToPages(pageMapInstructors, props.courses);
  const studentPages = mapCoursesToPages(pageMapStudent, props.courses);
  const pages = props.userIsInstructor ? instructorPages : studentPages;

  return (
    <Switch>
      <Route path="/verify" component={VerifiedSuccess} />
      {pages}
      {props.courses.length > 0 ? (
        <Route
          path={["/", "/signin", "/signup"]}
          exact
          component={() => {
            return <Redirect to={`/${props.courses[0]._id}/session`} />;
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
      <Route path="/accountsettings" component={AccountSettings} />
      <Route path="/addcourse" exact component={AddCourse} />
      <Route path="/enroll" component={EmailAddCourse} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: selectors.getSortedCourses(state),
    userType: selectors.getUserType(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

export default connect(mapStateToProps)(SignedInRoutes);
