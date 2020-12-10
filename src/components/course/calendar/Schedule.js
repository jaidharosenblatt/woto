import React from "react";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import TitleHeader from "../header/TitleHeader";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
import ActiveSessionAlert from "../announcement/ActiveSessionAlert";
import EventCard from "./EventCard";

/**
 * Schedule for displaying upcoming office hours
 * @param {Object} course active course from redux state
 */
const Schedule = (props) => {
  const { course } = props;

  return (
    <NavBarCentered>
      <ActiveSessionAlert />
      <TitleHeader
        title={`${course.code}'s Schedule`}
        details="View upcoming office hour sessions (currently static data)"
      />
      {events.map((evt, i) => {
        return <EventCard key={i} evt={evt} />;
      })}
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};

const events = [
  {
    startTime: "3:30PM",
    endTime: "4:30PM",
    dayOfWeek: "Mondays",
    assistants: ["Jaidha"],
  },
  {
    startTime: "5:00PM",
    endTime: "6:30PM",
    dayOfWeek: "Tuesdays",
    assistants: ["Matthew", "Tommy"],
  },
  {
    startTime: "5:30PM",
    endTime: "6:30PM",
    dayOfWeek: "Wednesdays",
    assistants: ["Jaidha", "Matthew"],
  },
  {
    startTime: "9:30PM",
    endTime: "10:30PM",
    dayOfWeek: "Thursdays",
    assistants: ["Matthew"],
  },

  {
    startTime: "3:30PM",
    endTime: "4:30PM",
    dayOfWeek: "Fridays",
    assistants: ["Jaidha", "Noah"],
  },
];

export default connect(mapStateToProps)(Schedule);
