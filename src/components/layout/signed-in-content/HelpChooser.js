import React from "react";

import TAHelp from "../../ta/TAHelp";
import StudentHelp from "../../student/Help";

const HelpChooser = (props) => {
  if (props.course.role === "Student") {
    return <StudentHelp {...props} />;
  }
  return <TAHelp {...props} />;
};

export default HelpChooser;
