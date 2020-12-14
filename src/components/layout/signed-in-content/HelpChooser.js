import React from "react";

import TAHelp from "../../ta/TAHelp";
import StudentHelp from "../../student/Help";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import { userIsAssistantOrInstructor } from "../../../redux/courses/actions/fetches";

const HelpChooser = (props) => {
  // default to student permissions in case of missing data
  if (userIsAssistantOrInstructor(props.course)) {
    return <TAHelp {...props} />;
  }
  return <StudentHelp {...props} />;
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};
export default connect(mapStateToProps)(HelpChooser);
