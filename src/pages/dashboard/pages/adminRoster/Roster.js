import React from "react";
import { Row, Col, Button } from "antd";
import HomeHeader from "../../HomeHeader";
import TaRosterTable from "../../../../components/Tables/admin-roster/RosterTAs";
import StudentRosterTable from "../../../../components/Tables/admin-roster/RosterStudents";
import API from "../../../../api/API";

/**
 * Allows admin to modify roster
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */

/*
 (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
 */
class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceStudent: ROSTER_STUDENT_DATA,
      dataSourceTA: ROSTER_TA_DATA,
    };
  }

  handleDeleteTA = (key) => {
    const dataSource = [...this.state.dataSourceTA];
    this.setState(
      {
        dataSourceTA: dataSource.filter((item) => item.key !== key),
      },
      () => {
        this.render();
      }
    );
  };

  handleDeleteStudent = (key) => {
    const dataSource = [...this.state.dataSourceStudent];
    this.setState(
      {
        dataSourceStudent: dataSource.filter((item) => item.key !== key),
      },
      () => {
        this.render();
      }
    );
  };

  removeUser = (e) => {
    console.log(e.currentTarget.value);
    // console.log(e.currentTarget);
  };
  //API METHOD
  getStudentsMethod = async () => {
    const adminId = "5f036885b5ce0900173c4849";
    const response = await API.courseData(adminId);
    console.log(response.assistants);
  };

  render() {
    return (
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Button onClick={this.getStudentsMethod}>Hello</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {" "}
            <HomeHeader
              course={this.props.course.name}
              page={this.props.details.title}
              description={this.props.details.description}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TaRosterTable
              tableData={this.state.dataSourceTA}
              removeUser={this.handleDeleteTA}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <StudentRosterTable
              course={this.props.course}
              tableData={this.state.dataSourceStudent}
              removeUser={this.handleDeleteStudent}
            />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Roster;

//FAKE DATA INPUTS

//TA DATA
const ROSTER_TA_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    year: "4",
    satisfactionRate: 0.5,
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
    satisfactionRate: 0.5,
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
    satisfactionRate: 0.5,
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
    satisfactionRate: 0.5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "5",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "4",
    satisfactionRate: 0.5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "6",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "4",
    satisfactionRate: 0.5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "7",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "4",
    satisfactionRate: 0.5,
    studentsHelped: "15",
    sessionsAttended: "3",
    interactionLength: "11:30",
    waitTime: "13:32",
  },
  {
    key: "8",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "4",
    satisfactionRate: 0.5,
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
    questionsAsked: "2",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: 0.5,
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "3",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: 0.5,
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "4",
    timeWaited: "15",
    interactionLength: "11:30",
    satisfaction: 0.7,
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "5",
    timeWaited: "30",
    interactionLength: "11:30",
    satisfaction: 0.8,
  },
  {
    key: "5",
    firstname: "Tommy",
    lastname: "Tilton",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "6",
    timeWaited: "49",
    interactionLength: "11:30",
    satisfaction: 0.5,
  },
  {
    key: "6",
    firstname: "Matthew",
    lastname: "Sclar",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "7",
    timeWaited: "15",
    interactionLength: "11:30",
    satisfaction: 0.7,
  },
  {
    key: "7",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    year: "1",
    sessionsAttended: "3",
    questionsAsked: "5",
    timeWaited: "30",
    interactionLength: "11:30",
    satisfaction: 0.8,
  },
];
