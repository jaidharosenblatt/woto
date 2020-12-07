import React, { useState, useEffect } from "react";

import ActiveTASession from "./ActiveTASession";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import { userStafferOf } from "../../redux/courses/actions/ta";
import PageCard from "../util-components/centeredpage/PageCard";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = (props) => {
  const { session } = props;
  const [inSession, setInSession] = useState(false);
  const _userStafferOf = props.userStafferOf;

  useEffect(() => {
    setInSession(_userStafferOf());
  }, [session, _userStafferOf]);

  if (inSession) {
    return (
      <NavBarCentered>
        <ActiveTASession />
      </NavBarCentered>
    );
  }

  return (
    <PageCard navbar>
      {props.session ? <JoinSession /> : <OpenSession />}
    </PageCard>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
  };
};
export default connect(mapStateToProps, { userStafferOf })(TAHelp);
