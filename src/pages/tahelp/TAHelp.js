import React, { useEffect, useContext, useReducer } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { reducer } from "./util/reducer";
import { TAHelpContext } from "./util/TAHelpContext";
import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";
import {
  select,
  loadCourse,
  joinSession,
  userStafferOf,
} from "../../ducks/courses";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = ({ courses, course, loadCourse, joinSession }) => {
  const initialState = { course, loading: true };
  const [oldState, dispatch] = useReducer(reducer, initialState);
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;
  const courseID = course._id;
  const state = select(courses, courseID);

  useEffect(() => {
    loadCourse(courseID, userID);
  }, [courseID, userID, loadCourse]);

  return (
    <CourseContext.Provider value={courseID}>
      <TAHelpContext.Provider value={{ oldState, dispatch }}>
        <LoadingScreenNavBar loading={state.loading}>
          {state.session && userStafferOf(state.session, userID) ? (
            <ActiveTASession courseID={courseID} />
          ) : (
            <NavBarCentered>
              <div className="ta-session-content">
                {state.session ? (
                  <JoinSession state={state} joinSession={joinSession} />
                ) : (
                  <OpenSession />
                )}
              </div>
            </NavBarCentered>
          )}
        </LoadingScreenNavBar>
      </TAHelpContext.Provider>
    </CourseContext.Provider>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    course: prevProps.course,
  };
};

export default connect(mapStateToProps, { loadCourse, joinSession })(TAHelp);
