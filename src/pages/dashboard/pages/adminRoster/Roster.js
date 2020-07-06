import React from "react";
import { Row, Col } from "antd";
import HomeHeader from "../../HomeHeader";
import TaRosterTable from "../../../../components/Tables/admin-roster/RosterTAs"
import StudentRosterTable from "../../../../components/Tables/admin-roster/RosterStudents"
/**
 * Allows admin to modify roster
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const Roster = (props) => {
  const removeUser = (e) => {
    console.log(e.currentTarget.value);
   // console.log(e.currentTarget);
  };
  return (
    <Col span={24}>
      <Row>
        <Col span={24}>
          {" "}
          <HomeHeader
            course={props.course.name}
            page={props.details.title}
            description={props.details.description}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TaRosterTable tableData={ROSTER_TA_DATA} removeUser={removeUser}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StudentRosterTable tableData={ROSTER_STUDENT_DATA} removeUser={removeUser}/>
        </Col>
      </Row>
    </Col>
  );
};

export default Roster;

//FAKE DATA INPUTS

//TA DATA
const ROSTER_TA_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "4",
    satisfactionRate: .5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
];

const ROSTER_STUDENT_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: .5,
    
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: .5,
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "15",
    interactionLength: "11:30",
    satisfaction: .7,
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "30",
    interactionLength: "11:30",
    satisfaction: .8,
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: .5,
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "15",
    interactionLength: "11:30",
    satisfaction: .7,
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "Debugging Solution",
    timeWaited: "30",
    interactionLength: "11:30",
    satisfaction: .8,
  },
];
