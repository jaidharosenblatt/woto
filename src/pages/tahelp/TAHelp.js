import React from "react";

import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { connect } from "react-redux";
import actions from "../../redux/courses";
import selectors from "../../redux/selectors";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = (props) => {
  const { session, course } = props;
  const courseID = course?._id;

  // if there is an active session but it hasn't been loaded, show whole page loading screen
  const loadingPage = course?.activeSession && !session;

  return (
    <LoadingScreenNavBar loading={loadingPage}>
      {props.userStafferOf() ? (
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
const { userStafferOf } = actions;
export default connect(mapStateToProps, { userStafferOf })(TAHelp);
