import React from "react";
import { Row, Col } from "antd";
import HomeHeader from "../../HomeHeader";
import DateSelectSpecificSession from "./DateSelectSpecificSession";
import PieChartCard from "../../../../components/stat/PieChartCard";
import TaDataDisplay from "../../ChartComponent/TaDataDisplay";
import TeachingStaffCardSpecific from "../../../../components/teachingStaff/TeachingStaffSpecifcSession"
import GroupTableCard from "../../../../components/Tables/specific-session/GroupTableCard"
import InteractionsTable from "../../../../components/Tables/specific-session/InteractionsTable";
//import { render } from "@testing-library/react";
/**
 * Allows admin to break down OH by day of week and time of day
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
class SpecificSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dateSelected: "", timeSelected: "" };
  }
  //Handler for specific Date Selected
  dateOnChange = (e) => {
    if (e !== null) {
      this.setState({ dateSelected: e });
      console.log(e);
      console.log(e._d);
    }

    // console.log(e._d);
    // const dayselect = e._d;
    //  console.log(dayselect.getDate());
  };
  //Handler for time selected
  timeOnChange = (e) => {
    this.setState({ timeSelected: e });
    console.log(e);
  };
//Handler for clicking Details in TeachingStaffSpecificSession Card
  
  //Setup all components
  renderContent() {
    return (
      <Col span={24}>
        <Row>
          <Col span={24}>
            <HomeHeader
              course={this.props.course.name}
              page={this.props.details.title}
              description={this.props.details.description}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DateSelectSpecificSession
              dateOnChange={this.dateOnChange}
              timeOnChange={this.timeOnChange}
            />
          </Col>
        </Row>
        <Row>
          <Col flex="auto" lg={24} xl={12}>
            <TaDataDisplay
              waitData={WaitTimeData}
              interactionData={InteractionData}
            />
          </Col>
          <Col lg={24} xl={12}>
            <PieChartCard
              conceptData={PIE_CONCEPT_DATA}
              assignmentData={PIE_ASSIGNMENT_DATA}
            />
          </Col>
        </Row>
        <Row>
          <Col  xs={24} sm={24} md={24} lg={24} xl={12}>
            <TeachingStaffCardSpecific active="true" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <GroupTableCard />
          </Col>
        </Row>
        <Row>
          <Col  span={24}>
          <InteractionsTable tableData={INTERACTIONS_DATA} />
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    return <div className="group-component" style={{margin: "0px", width: "100%"}}>{this.renderContent()}</div>;
  }
}

export default SpecificSession;

//*DATA VARIABLES*//

//PIE CHART DATA VARIABLES
const PIE_ASSIGNMENT_DATA = [
  { name: "HW 1 Problem 4", value: 400 },
  { name: "HW 1 Problem 3", value: 300 },
  { name: "HW 1 Problem 2", value: 300 },
  { name: "HW 1 Problem 1", value: 200 },
];

const PIE_CONCEPT_DATA = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

//TA DATA DISPLAY
const InteractionData = {
  title: "Interaction Length",
  color: "#1890FF",
  units: "minutes",
  min: 5,
  max: 150,
  avg: 30,
};

const WaitTimeData = {
  title: "Wait Time",
  color: "#eb5757",
  units: "minutes",
  min: 10,
  max: 300,
  avg: 67,
};

//INTERACTIONS DATA

const INTERACTIONS_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "13:32",
    interactionLength: "11:30",
    time: "3:49pm",
    rating: "thumbsUp",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    waitTime: "24:02",
    interactionLength: "4:30",
    time: "3:45pm",
    rating: "thumbsUp",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    waitTime: "12:23",
    interactionLength: "11:30",
    time: "3:15pm",
    rating: "thumbsUp",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "49:30",
    interactionLength: "11:30",
    time: "3:03pm",
    rating: "thumbsDown",
  },
];