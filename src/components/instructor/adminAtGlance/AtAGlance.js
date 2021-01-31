import React from "react";
import TaDataDisplay from "../../analytics/chart/TaDataDisplay";
import { Row, Col, DatePicker } from "antd";
import ChartCard from "../../analytics/chart/ChartCard";
import PieChartCard from "../../analytics/sessions/PieChartCardSession";
import HomeHeader from "../HomeHeader";
import DateSelectAtGlance from "./DateSelectAtGlance";
import TASelect from "../../form/TASelect";

const AtAGlance = (props) => {
  return (
    <Col span={24}>
      <HomeHeader
        course={props.course.name}
        page={props.details.title}
        description={props.details.description}
      />
      <DatePicker.RangePicker />
      <TASelect />
      <Col span={24}>
        <h2>{`Overall Performance between ${StartDate} - ${EndDate}`}</h2>

        <Row justify="center">
          <Col xs={24} md={12}>
            <TaDataDisplay
              waitData={WaitTimeData}
              interactionData={InteractionData}
            />
          </Col>

          <Col xs={24} md={12}>
            <PieChartCard
              conceptData={PIE_CONCEPT_DATA}
              assignmentData={PIE_ASSIGNMENT_DATA}
            />
          </Col>
        </Row>

        <Row justify="center">
          <Col span={24}>
            <ChartCard
              dataList={TABLE_LIST}
              updateTime="30 minutes"
              dataKey="session"
            />
          </Col>
        </Row>
      </Col>
    </Col>
  );
};

export default AtAGlance;

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

///DATA VARIABLES/////
const StartDate = "May 10th";
const EndDate = "June 9th";

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
//********************** */

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
