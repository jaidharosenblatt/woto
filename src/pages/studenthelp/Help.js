import React from "react";
import JoinQueue from "./JoinQueue";

import ActiveSession from "./ActiveSession";
import WotoRoom from "./wotos/WotoRoom";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

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
  const { session, activeQuestion, bypassSession } = props;

  var page = null;
  if (activeQuestion) {
    page = <ActiveSession />;
  } else if (session && !bypassSession) {
    page = <JoinQueue />;
  } else {
    page = <WotoRoom />;
  }

  return <div className="HelpWrapper">{page}</div>;
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    bypassSession: selectors.getBypassSession(state),
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps)(Help);
