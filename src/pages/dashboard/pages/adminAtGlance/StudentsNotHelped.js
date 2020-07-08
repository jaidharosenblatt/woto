import React from "react";
import { Row, Col } from "antd";
import HomeHeader from "../../HomeHeader";
import DateSelectAtGlance from "./DateSelectAtGlance";
import StudentsNotHelpedTable from "../../../../components/Tables/admin-at-glance/StudentsNotHelpedTable";
class StudentsNotHelped extends React.Component {
  //***************************** */
  //SUGGEST DAY OF SESSION ADDED TO TABLE
  //***************************** */
  constructor() {
    super();
    this.state = { allTeachingAssistants: "true" };
  }

  taChangeHandler = (e) => {
    //console.log(e);
    if (e !== "All teaching assistants") {
      this.setState({ allTeachingAssistants: "false" });
    } else if (e === "All teaching assistants") {
      this.setState({ allTeachingAssistants: "true" });
    }

    // console.log(this.state.allTeachingAssistants);
    // console.log(this.props.collapsed)
  };

  renderContent() {
    return(<Col span={24}>
      <Row>
        <Col span={24}>
          <StudentsNotHelpedTable tableData={STUDENTS_NOT_HELPED_DATA} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h4>{`${STUDENTS_NOT_HELPED_DATA.length} students not helped`}</h4>
        </Col>
      </Row>
    </Col>);
  }

  render() {
    return (
      <Col span={24}>
        <Row>
          <Col span={24}>
            <HomeHeader
           // course="course"
           // page = "coursetitle"
           // description = "description"
              course={this.props.course.name}
              page={this.props.details.title}
              description={this.props.details.description}
            />{" "}
          </Col>
        </Row>

        <Row>
          <Col sm={24}>
            <DateSelectAtGlance taSelectChange={this.taChangeHandler} />
          </Col>
        </Row>
        {this.renderContent}
      </Col>
    );
  }
}

export default StudentsNotHelped;

//fake data below

///DATA VARIABLES/////
const StartDate = "May 10th";
const EndDate = "June 9th";

//Table Data - Students not helped
const STUDENTS_NOT_HELPED_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    timeWaited: "14:32",
    enteredQueue: "3:49pm",
    leftQueue: "4:30pm",
    sessionStart: "3:00pm",
    sessionEnd: "5:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    timeWaited: "20:32",
    enteredQueue: "3:55pm",
    leftQueue: "4:55pm",
    sessionStart: "2:00pm",
    sessionEnd: "6:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    timeWaited: "25:32",
    enteredQueue: "3:49pm",
    leftQueue: "4:30pm",
    sessionStart: "3:00pm",
    sessionEnd: "5:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "4",
    firstname: "Kaden",
    timeWaited: "40:32",
    enteredQueue: "6:49pm",
    leftQueue: "7:30pm",
    sessionStart: "6:00pm",
    sessionEnd: "8:30pm",
    assignment: "APT 2",
    stage: "Debugging Solution",
  },
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    timeWaited: "14:32",
    enteredQueue: "3:49pm",
    leftQueue: "4:30pm",
    sessionStart: "3:00pm",
    sessionEnd: "5:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    timeWaited: "20:32",
    enteredQueue: "3:55pm",
    leftQueue: "4:55pm",
    sessionStart: "2:00pm",
    sessionEnd: "6:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    timeWaited: "25:32",
    enteredQueue: "3:49pm",
    leftQueue: "4:30pm",
    sessionStart: "3:00pm",
    sessionEnd: "5:30pm",
    assignment: "APT 2",
    stage: "Just Started",
  },
  {
    key: "4",
    firstname: "Kaden",
    timeWaited: "40:32",
    enteredQueue: "6:49pm",
    leftQueue: "7:30pm",
    sessionStart: "6:00pm",
    sessionEnd: "8:30pm",
    assignment: "APT 2",
    stage: "Debugging Solution",
  },
];

//********************** */
