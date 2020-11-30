import React, { useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { connect } from "react-redux";
import actions from "../../redux/courses/actionCreators";
import selectors from "../../redux/selectors";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = (props) => {
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;
  const { session, course } = props;
  const courseID = course?._id;

  const _loadCourse = props.loadCourse;
  // if there is an active session but it hasn't been loaded, show whole page loading screen
  const loadingPage = course?.activeSession && !session;

  useEffect(() => {
    _loadCourse(courseID, userID);
  }, [courseID, userID, _loadCourse]);

  return (
    <LoadingScreenNavBar loading={loadingPage}>
      {session && props.userStafferOf(session, userID) ? (
        <ActiveTASession courseID={courseID} />
      ) : (
        <NavBarCentered>
          <div className="ta-session-content">
            {session ? <JoinSession /> : <OpenSession />}
          </div>
        </NavBarCentered>
      )}
    </LoadingScreenNavBar>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    course: selectors.getCourse(state),
  };
};
const { loadCourse, userStafferOf } = actions;
export default connect(mapStateToProps, { loadCourse, userStafferOf })(TAHelp);
