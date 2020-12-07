import React, { useState, useEffect } from "react";

import ActiveTASession from "./ActiveTASession";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import { userStafferOf } from "../../redux/courses/actions/ta";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = (props) => {
  const { session, userID } = props;
  const [inSession, setInSession] = useState(false);
  const _userStafferOf = props.userStafferOf;

  useEffect(() => {
    setInSession(_userStafferOf(session, userID));
  }, [session, userID, _userStafferOf]);

  if (inSession) {
    return <ActiveTASession />;
  }

  return (
    <NavBarCentered>
      <div className="ta-session-content">
        {props.session ? <JoinSession /> : <OpenSession />}
      </div>
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
  };
};
export default connect(mapStateToProps, { userStafferOf })(TAHelp);
