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

  const redirect = () => {
    const coursesFromUser = props.user.courses;
    if (coursesFromUser?.length > 0) {
      return <Redirect to={`/courses/${coursesFromUser[0].course}/session`} />;
    }

    return <Redirect to="/addcourse" />;
  };

  const zoomAuthed = () => {
    return <p> yayyy </p>;
  }

  return (
    <Switch>
      <Route path="/verify" component={VerifiedSuccess} />
      {pages}

      <Route path={["/", "/signin", "/signup"]} exact component={redirect} />
      <Route path="/oauth" component={redirect} />
      <Route path="/zoom" component={zoomAuthed} />
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
    user: selectors.getUser(state),
    userIsInstructor: selectors.userIsInstructor(state),
  };
};

export default connect(mapStateToProps)(SignedInRoutes);
