import React from "react";
import JoinQueue from "./JoinQueue";

import ActiveSession from "./ActiveSession";
import NoActiveSession from "./NoActiveSession";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import NavBarCentered from "../util-components/centeredpage/NavBarCentered";
import PageCard from "../util-components/centeredpage/PageCard";

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
  const { session, activeQuestion } = props;

  if (!session) {
    return (
      <PageCard navbar>
        <NoActiveSession />
      </PageCard>
    );
  }
  return (
    <NavBarCentered navbar>
      {activeQuestion ? <ActiveSession /> : <JoinQueue />}
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps)(Help);
