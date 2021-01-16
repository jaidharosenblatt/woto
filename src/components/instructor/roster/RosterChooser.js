import React from "react";
import WarningUnsafeMobile from "../../layout/WarningUnsafeMobile";

import DukeRoster from "./DukeRoster";
import Roster from "./Roster";

/**
 * Choose between Roster and Duke Roster based on course attribute
 * @param {Course} course
 */
export default function RosterChooser(props) {
  return (
    <WarningUnsafeMobile>
      {props.course.isDukeCourse ? (
        <DukeRoster {...props} />
      ) : (
        <Roster {...props} />
      )}
    </WarningUnsafeMobile>
  );
}
