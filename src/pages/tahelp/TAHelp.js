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
import redux from "../../redux/courses";

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
  const state = redux.select(courses, courseID);

  // if there is an active session but it hasn't been loaded, show whole page loading screen
  const loadingPage = course.activeSession && !state.session;

  useEffect(() => {
    loadCourse(courseID, userID);
  }, [courseID, userID, loadCourse]);

  return (
    <CourseContext.Provider value={courseID}>
      <TAHelpContext.Provider value={{ oldState, dispatch }}>
        <LoadingScreenNavBar loading={loadingPage}>
          {state.session && redux.userStafferOf(state.session, userID) ? (
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

export default connect(redux.mapStateToProps, redux)(TAHelp);
