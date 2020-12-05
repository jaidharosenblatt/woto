import React from "react";

import ActiveTASession from "./ActiveTASession";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = (props) => {
  const { session, course } = props;

  if (course.activeSession) {
    return <ActiveTASession />;
  }

  return (
    <NavBarCentered>
      <div className="ta-session-content">
        {session ? <JoinSession /> : <OpenSession />}
      </div>
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    course: selectors.getCourse(state),
  };
};
export default connect(mapStateToProps)(TAHelp);
