import React from "react";

import TAHelp from "../../pages/ta/TAHelp";
import StudentHelp from "../../pages/student/Help";

const HelpChooser = (props) => {
  if (props.course.role === "Student") {
    return <StudentHelp {...props} />;
  }
  return <TAHelp {...props} />;
};

export default HelpChooser;
