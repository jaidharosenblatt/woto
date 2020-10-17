import React, { useEffect, useReducer, useState, useContext } from "react";
import JoinQueue from "./JoinQueue";

import { HelpContext } from "./util/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";
import ActiveSession from "./ActiveSession";
import WotoRoom from "./wotos/WotoRoom";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";
import { loadCourse, select } from "../../ducks/courses";

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
  const { activeDiscussion, activeQuestion, bypassSession, loading } = select(
    props.courses,
    props.course._id
  );

  useEffect(() => {
    props.loadCourse(props.course._id, userID);
  }, [props.course]);

  var page = null;
  if (activeQuestion) {
    page = <ActiveSession />;
  } else if (activeDiscussion || bypassSession) {
    page = <WotoRoom />;
  } else {
    page = <JoinQueue />;
  }

  return (
    <CourseContext.Provider value={props.course?._id}>
      <HelpContext.Provider value={{ state: null, dispatch: null }}>
        <LoadingScreenNavBar centered loading={loading}>
          <div className="HelpWrapper">{page}</div>
        </LoadingScreenNavBar>
      </HelpContext.Provider>
    </CourseContext.Provider>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    course: prevProps.course,
  };
};

export default connect(mapStateToProps, { loadCourse })(Help);
