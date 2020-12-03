import React from "react";

import TAHelp from "../../pages/tahelp/TAHelp";
import StudentHelp from "../../pages/studenthelp/Help";

const HelpChooser = (props) => {
  console.log(props);
  if (props.course.role === "Student") {
    return <StudentHelp {...props} />;
  }
  return <TAHelp {...props} />;
};

export default HelpChooser;
