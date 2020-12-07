import React from "react";

import TAHelp from "../../ta/TAHelp";
import StudentHelp from "../../student/Help";

const HelpChooser = (props) => {
  // default to student permissions in case of missing data
  if (props.course.role === "TA" || props.course.role === "Instructor") {
    return <TAHelp {...props} />;
  }
  return <StudentHelp {...props} />;
};

export default HelpChooser;
