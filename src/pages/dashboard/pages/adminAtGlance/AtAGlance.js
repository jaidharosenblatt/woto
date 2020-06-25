import React from "react";
import TAInfo from "./TAInfo";
import TaDataDisplay from "../../ChartComponent/TaDataDisplay";
import { Row, Col, Card } from "antd";
import ChartCard from "../../ChartComponent/ChartCard";
import DataPieChart from "../../../../components/stat/DataPieChart";
import HomeHeader from "../../HomeHeader";
class AtAGlance extends React.Component {
  render() {
    return (
      <div className="atAGlance">
        <Row align="middle" justify="start">
          <Col span={24}>
            <HomeHeader
              course={this.props.course.name}
              page={this.props.details.title}
              description={this.props.details.description}
            />{" "}
          </Col>
        </Row>

        <Row align="middle" justify="start">
          <Col span={24}>
            <h5>{`${TAProfile.name}'s Performance between ${StartDate} - ${EndDate}`}</h5>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col xs={24} md={12} lg={12} xl={12}>
            <TaDataDisplay interactionData={InteractionData} />
          </Col>
          <Col xs={24} md={12} lg={12} xl={12}>
            <Card>
              <DataPieChart data={PIE_DATA} />
            </Card>
          </Col>
        </Row>

        <Row align="center">
          <Col span={24}>
            <ChartCard dataList={TABLE_LIST} updateTime="30 minutes" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default AtAGlance;

//PIE CHART DATA VARIABLES
const PIE_DATA = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

///DATA VARIABLES/////
const StartDate = "May 10th";
const EndDate = "June 9th";

const TAProfile = {
  name: "Jaidha Rosenblatt",
  role: "Undergraduate Teaching Assistant",
  year: "2021",
  classes: [
    {
      name: "CS 101",
      position: "Teaching Assistant",
      description: "Introduction to programming",
    },
    {
      name: "CS 310",
      position: "Student",
      description: "Computer Architecture",
    },
    {
      name: "CS 330",
      position: "Student",
      description: "Design and Analysis of Algorithms",
    },
  ],
};

const satisfactionRate = 70;
const studentsSeen = 56;
const notHelped = 12;

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

const TABLE_LIST = [
  { session: "1", min: 10, avg: 30, max: 100 },
  { session: "2", min: 9, avg: 40, max: 110 },
  { session: "3", min: 10, avg: 35, max: 120 },
  { session: "4", min: 7, avg: 30, max: 130 },
  { session: "5", min: 3, avg: 50, max: 120 },
  { session: "6", min: 10, avg: 10, max: 110 },
  { session: "7", min: 10, avg: 20, max: 100 },
  { session: "8", min: 2, avg: 70, max: 90 },
  { session: "9", min: 3, avg: 50, max: 80 },
  { session: "10", min: 10, avg: 30, max: 90 },
  { session: "11", min: 12, avg: 20, max: 100 },
  { session: "12", min: 10, avg: 10, max: 110 },
  { session: "13", min: 9, avg: 20, max: 120 },
  { session: "14", min: 1, avg: 30, max: 130 },
  { session: "15", min: 1, avg: 40, max: 140 },
  { session: "16", min: 15, avg: 50, max: 150 },
  { session: "17", min: 17, avg: 60, max: 140 },
  { session: "18", min: 12, avg: 70, max: 130 },
  { session: "19", min: 10, avg: 80, max: 120 },
  { session: "20", min: 5, avg: 90, max: 110 },
  { session: "21", min: 1, avg: 60, max: 100 },
  { session: "22", min: 2, avg: 50, max: 90 },
  { session: "23", min: 7, avg: 40, max: 80 },
  { session: "24", min: 10, avg: 30, max: 70 },
  { session: "25", min: 12, avg: 20, max: 60 },
  { session: "26", min: 10, avg: 10, max: 70 },
  { session: "27", min: 9, avg: 20, max: 80 },
  { session: "28", min: 3, avg: 30, max: 90 },
  { session: "29", min: 8, avg: 40, max: 100 },
  { session: "30", min: 10, avg: 50, max: 110 },
  { session: "31", min: 10, avg: 60, max: 120 },
];
