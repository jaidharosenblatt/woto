import React from "react";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import DukeRoster from "./DukeRoster";
import Roster from "./Roster";

/**
 * Choose between Roster and Duke Roster based on course attribute
 * @param {Course} course
 */
const RosterChooser = ({ course }) => {
  if (course.isDukeCourse) {
    return <DukeRoster />;
  }
  return <Roster />;
};

const mapStateToProps = (state) => ({
  course: selectors.getCourse(state),
});

export default connect(mapStateToProps)(RosterChooser);
