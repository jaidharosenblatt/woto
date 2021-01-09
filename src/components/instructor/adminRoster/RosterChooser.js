import React from "react";

import DukeRoster from "./DukeRoster";
import Roster from "./Roster";

/**
 * Choose between Roster and Duke Roster based on course attribute
 * @param {Course} course
 */
export default function RosterChooser(props) {
  if (props.course.isDukeCourse) {
    return <DukeRoster {...props} />;
  }
  return <Roster {...props} />;
}
