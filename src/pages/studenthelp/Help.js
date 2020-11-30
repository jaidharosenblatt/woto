import React, { useEffect, useContext } from "react";
import JoinQueue from "./JoinQueue";

import { AuthContext } from "../../contexts/AuthContext";
import ActiveSession from "./ActiveSession";
import WotoRoom from "./wotos/WotoRoom";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import { connect } from "react-redux";
import actions from "../../redux/courses";
import selectors from "../../redux/courses/selectors";

/**
 * @jaidharosenblatt Wrapper page for the student help process for both Woto rooms
 * and for submitting a question for a TA queue. Uses state variables to hold the current
 * stage of the problem and passes down as props to all of the pages. Decided to use
 * hooks instead of context for readability
 *
 * @param {course} code course code to display on various help pages
 * @param {course} activeSession the key of the active session if it exists
 */
const Help = (props) => {
  const authContext = useContext(AuthContext);
  const userID = authContext?.state?.user?._id;
  const courseID = props.course._id;
  const { session, activeQuestion, bypassSession } = props;
  const _loadCourse = props.loadCourse;

  // if there is an active session but it hasn't been loaded, show whole page loading screen
  const loadingPage = props.course.activeSession && !session;

  useEffect(() => {
    _loadCourse(courseID, userID);
  }, [courseID, userID, _loadCourse]);

  var page = null;
  if (activeQuestion) {
    page = <ActiveSession />;
  } else if (session && bypassSession) {
    page = <JoinQueue />;
  } else {
    page = <WotoRoom />;
  }

  return (
    <LoadingScreenNavBar centered loading={loadingPage}>
      <div className="HelpWrapper">{page}</div>
    </LoadingScreenNavBar>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    bypassSession: selectors.getBypassSession(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

const { loadCourse } = actions;
export default connect(mapStateToProps, { loadCourse })(Help);
